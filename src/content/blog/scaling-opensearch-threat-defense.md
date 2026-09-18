---
title: "Scaling OpenSearch for Real-Time Email Threat Defense"
date: "2024-03-28"
description: "Architecting ingestion pipelines, index lifecycle management, and fuzzy similarity queries to detect phishing and BEC at scale."
tags: ["Data Systems", "OpenSearch", "Email Security", "Search"]
readTime: "8 min read"
author: "Sudhir Mishra"
---

Email threat defense systems must process millions of inbound messages every minute, analyzing header telemetry, SPF/DKIM verification signals, and body content for signs of Business Email Compromise (BEC) and phishing campaigns.

In this article, I examine how we architected an **Amazon OpenSearch** cluster to index, search, and score high-volume email events under sub-50ms query SLAs.

---

## 1. High-Throughput Stream Ingestion Pipeline

To decouple email delivery nodes from search cluster indexing spikes, we placed Amazon SQS and AWS Lambda buffers between message ingestion and OpenSearch:

```
[ Inbound MTA / Gateway ]
          |
          v
    [ Amazon SQS ] (Batching & Backpressure Buffer)
          |
          v
   [ AWS Lambda Bulk Processor ] (Concurrent Worker Pool)
          |
          v
  [ OpenSearch Cluster (Hot Nodes) ]
```

### Bulk Ingestion Optimization

Sending single-document indexing requests to OpenSearch under high traffic creates severe HTTP connection overhead and JVM heap pressure. Instead, Lambda functions consume SQS batches and leverage the OpenSearch Bulk API:

```python
from opensearchpy import OpenSearch, helpers

def bulk_index_threat_events(client: OpenSearch, events: list[dict], index_name: str):
    """
    Constructs an optimized bulk payload with backoff retry.
    """
    actions = [
        {
            "_index": index_name,
            "_id": event["message_id"],
            "_source": {
                "timestamp": event["timestamp"],
                "sender_domain": event["sender_domain"],
                "spf_result": event["spf_result"],
                "dkim_result": event["dkim_result"],
                "dmarc_result": event["dmarc_result"],
                "subject_tokens": event["subject_tokens"],
                "threat_score": event["threat_score"],
                "cluster_label": event["cluster_label"]
            }
        }
        for event in events
    ]

    success_count, errors = helpers.bulk(
        client,
        actions,
        chunk_size=500,
        max_retries=3,
        initial_backoff=0.5
    )
    return success_count
```

---

## 2. Index Lifecycle Management (ILM) Strategy

Security telemetry experiences a sharp access degradation curve:
- **0–48 hours**: Hot tier (SSD-backed, high compute, queried continuously by real-time detection rules).
- **3–30 days**: Warm tier (UltraWarm storage, lower cost, accessed during campaign investigations).
- **31–365 days**: Cold / S3 archive (infrequently accessed compliance storage).

By defining an automated Index State Management (ISM) policy in OpenSearch, indexes roll over daily or when reaching 40GB shard sizes:

```json
{
  "policy": {
    "description": "Email telemetry lifecycle policy",
    "default_state": "hot",
    "states": [
      {
        "name": "hot",
        "actions": [
          { "rollover": { "min_index_age": "1d", "min_primary_shard_size": "40gb" } }
        ],
        "transitions": [
          { "state_name": "warm", "conditions": { "min_index_age": "2d" } }
        ]
      },
      {
        "name": "warm",
        "actions": [
          { "replica_count": { "number_of_replicas": 1 } }
        ],
        "transitions": [
          { "state_name": "delete", "conditions": { "min_index_age": "30d" } }
        ]
      }
    ]
  }
}
```

---

## 3. Detecting BEC Campaigns with Fuzzy Token Matching

Attackers frequently spoof VIP names using lookalike domains or slight Unicode typographical variations (typosquatting). OpenSearch's custom analyzers combine n-gram tokenizers with Levenshtein distance matching:

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "fuzzy": {
            "display_name": {
              "value": "CFO Executive",
              "fuzziness": "AUTO",
              "prefix_length": 2
            }
          }
        }
      ],
      "filter": [
        { "term": { "dmarc_result": "fail" } },
        { "range": { "timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}
```

This pattern catches fraudulent transfer requests within seconds of email delivery, enabling automated quarantine actions before employees open the message.

---

## 4. Operational Results

- **P99 Ingestion Latency**: Under 45ms per 500-document batch.
- **Search Throughput**: 1,800 complex heuristic queries per second during peak hours.
- **Cost Reduction**: Shifting indices to UltraWarm on day 3 reduced overall AWS OpenSearch spend by **42%**.
