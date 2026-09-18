---
title: "Declarative Infrastructure Patterns for Multi-Tenant Security Services"
date: "2024-02-19"
description: "Best practices for writing modular, drift-resistant Terraform code for multi-region security and data ingestion microservices."
tags: ["DevOps", "Terraform", "Cloud", "Security"]
readTime: "6 min read"
author: "Sudhir Mishra"
---

Managing infrastructure for security-sensitive microservices requires strict reproducibility, drift detection, and rigorous tenant isolation. When multiple enterprise customers require dedicated ingestion queues, KMS keys, and isolated database schemas, manual configuration or ad-hoc scripts quickly become unmaintainable.

In this post, I outline the **declarative Terraform architecture** we developed to provision secure, auditable cloud resources across multiple AWS regions.

---

## 1. Modular Infrastructure Architecture

We structure our Terraform repositories into composable modules with explicit inputs and outputs:

```
terraform/
├── environments/
│   ├── prod/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   └── staging/
└── modules/
    ├── ingest_pipeline/
    │   ├── sqs.tf
    │   ├── lambda.tf
    │   └── iam.tf
    └── security_kms/
        ├── kms.tf
        └── outputs.tf
```

### Module Boundary Principles

- **No Implicit Cross-Module Coupling**: Modules pass references via explicit IDs and ARNs, never by inspecting other module internals.
- **Enforced Least-Privilege IAM**: IAM policies are synthesized within the module based strictly on the resources created within that module.

---

## 2. Dynamic Tenant Ingestion Queuing

Using Terraform's `for_each` meta-argument, we dynamically provision SQS dead-letter queues and KMS-encrypted ingress endpoints per enterprise tenant:

```hcl
variable "tenants" {
  type = map(object({
    max_batch_size       = number
    retention_seconds    = number
    alarm_threshold_msgs = number
  }))
  description = "Map of active tenant configurations"
}

resource "aws_sqs_queue" "tenant_dlq" {
  for_each = var.tenants

  name                      = "ingest-${each.key}-dlq"
  message_retention_seconds = 1209600 # 14 days
  kms_master_key_id         = aws_kms_key.security_stream.arn

  tags = {
    Tenant      = each.key
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_sqs_queue" "tenant_queue" {
  for_each = var.tenants

  name                      = "ingest-${each.key}-primary"
  message_retention_seconds = each.value.retention_seconds
  kms_master_key_id         = aws_kms_key.security_stream.arn

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.tenant_dlq[each.key].arn
    maxReceiveCount     = 5
  })
}
```

---

## 3. Automated Drift Detection & Continuous CI/CD

To prevent manual out-of-band modifications in AWS console, our deployment pipeline runs scheduled drift checks every 6 hours:

```yaml
# GitHub Actions workflow snippet
name: Terraform Drift Check
on:
  schedule:
    - cron: '0 */6 * * *'

jobs:
  drift-detection:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
      - name: Plan with Detailed Exit Code
        run: |
          terraform plan -detailed-exitcode -out=tfplan || exit_code=$?
          if [ $exit_code -eq 2 ]; then
            echo "Infrastructure drift detected! Alerting on-call..."
            # Trigger PagerDuty / Slack Webhook
            exit 2
          fi
```

---

## 4. Key Takeaways

1. **Deterministic Environments**: Staging and Production remain cryptographically and structurally identical.
2. **Instant Customer Provisioning**: Onboarding a new tier-1 customer requires only adding an entry to the `tenants` variable map and running `terraform apply`.
3. **Audit Compliance**: All infrastructure changes produce git pull requests with automated plan outputs, meeting enterprise SOC 2 and ISO 27001 change-management criteria.
