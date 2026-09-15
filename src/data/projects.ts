export interface Project {
    id: string;
    order: number;
    title: string;
    category: 'security' | 'data' | 'web';
    categories: string;
    metaPill: string;
    summary: string;
    challenge: string;
    approach: string[];
    outcome: string;
    stack: string[];
    keywords: string;
}

export const projects: Project[] = [
    {
        id: 'krvzt',
        order: 1,
        title: 'Email Threat Protection Platform',
        category: 'security',
        categories: 'security',
        metaPill: 'Security Product Engineering · Cisco Systems',
        summary: 'Architected and implemented enterprise-grade threat detection services for an email security platform (MTA) safeguarding thousands of enterprise organizations. Engineered an extensible adapter framework decoupling proprietary threat-scanning engines from downstream messaging queues, enabling seamless onboarding of advanced URL inspection models, malware sandboxing, and SPF/DKIM/DMARC alignment checks. Leveraged AWS SQS for resilient async queueing between engines, AWS SNS for real-time threat feed updates, and AWS Lambda for serverless threat intelligence lookups without blocking line-speed message processing. Stored high-resolution verdict metadata in AWS RDS with Celery and Redis worker fleets, providing unified administrative audit APIs, quarantine workflows, and DLP policy controls across millions of processed emails.',
        challenge: 'The email-security product (an enterprise Message Transfer Agent / MTA) needed to detect phishing, domain spoofing, Business Email Compromise (BEC), and zero-day malware attachments using several independent threat-scanning engines and external intelligence feeds — while keeping the scanning framework maintainable as new engines and feed formats were added over time, and giving administrators enough visibility to search, tag, and act on processed messages.',
        approach: [
            'Designed an adapter-based plugin layer to evaluate SPF, DKIM, and DMARC alignment and route suspicious payloads to sandbox environments.',
            'Leveraged AWS SQS for resilient, asynchronous message queuing between threat-scanning engines, and AWS SNS for real-time alerting on critical threat feed updates.',
            'Utilized AWS Lambda for serverless, event-driven threat intelligence lookups without blocking line-speed message processing, storing verdict metadata in highly available AWS RDS instances.',
            'Built administrative APIs and audit queries backed by AWS RDS to give operations visibility into engine verdicts and message-level threat metadata.'
        ],
        outcome: 'Allowed the security product to ingest new threat feeds and scanning engines without core pipeline rewrites, reducing new-engine onboarding time and giving enterprise administrators verifiable audit visibility into quarantine workflows, Data Loss Prevention (DLP) violations, and threat verdicts.',
        stack: ['Python', 'AWS Lambda', 'AWS SQS', 'AWS SNS', 'AWS RDS', 'Celery', 'Redis', 'REST APIs'],
        keywords: 'email threat protection platform security mta spf dkim dmarc bec phishing malware aws lambda sqs sns rds celery redis rest apis dlp quarantine cisco'
    },
    {
        id: 'bqwmp',
        order: 2,
        title: 'Cloud Analytics & Security Data Systems',
        category: 'data',
        categories: 'data',
        metaPill: 'Cloud Infrastructure / Big Data · Cisco Systems',
        summary: 'Designed, built, and optimized high-throughput cloud analytics pipelines aggregating multi-terabyte security telemetry, message verdicts, and threat metadata daily. Engineered distributed ETL pipelines in Python using Apache Airflow to orchestrate data extraction from Amazon S3, transformation via AWS Glue, and COPY-based bulk loading into AWS Redshift clusters. Re-indexed and tuned AWS Redshift distribution and sort keys for petabyte-scale telemetry, accelerating complex analytical aggregation queries by more than 40%. Migrated operational data stores to AWS RDS (PostgreSQL) to serve high-throughput transactional queries, and built secure FastAPI microservices delivering real-time metrics directly to executive dashboards and customer reporting portals.',
        challenge: 'As processed email volume grew across commercial and government cloud environments, the analytics layer needed to ingest, transform, and serve reporting queries on tens of millions of threat events per day without database contention or slow dashboard queries.',
        approach: [
            'Structured ETL workflows in Python using Apache Airflow to orchestrate parallel data extraction from S3, transformation via AWS Glue, and COPY-based bulk loading into AWS Redshift.',
            'Re-indexed and tuned AWS Redshift table distribution and sort keys for petabyte-scale security telemetry, reducing query runtimes on heavy analytical dashboards.',
            'Migrated operational databases to AWS RDS (PostgreSQL) to handle high-throughput transactional queries from downstream REST microservices.',
            'Developed secure, token-authenticated REST microservices using FastAPI to deliver aggregated metrics and threat trends directly to downstream reporting interfaces, backed by automated pipeline health monitoring.'
        ],
        outcome: 'Delivered reliable reporting across multi-million event daily workloads, with automated monitoring and alerting that drastically reduced pipeline downtime and eliminated silent data ingestion failures.',
        stack: ['Python', 'AWS Redshift', 'AWS RDS', 'Apache Airflow', 'FastAPI', 'AWS Glue', 'Amazon S3'],
        keywords: 'cloud analytics security data systems big data etl python aws redshift aws rds apache airflow fastapi aws glue amazon s3 sql petabyte telemetry cisco'
    },
    {
        id: 'fndxy',
        order: 3,
        title: 'OpenSearch Migration & FedRAMP / GovCloud Compliance',
        category: 'security',
        categories: 'security data',
        metaPill: 'GovCloud Infrastructure & Search · Cisco Systems',
        summary: 'Directed the architectural migration of legacy search clusters to managed AWS OpenSearch within strict FedRAMP Moderate and AWS GovCloud federal regulatory environments. Architected a highly resilient dual-write pipeline using AWS SQS message queues and Python to index hundreds of millions of threat logs concurrently across legacy Elasticsearch and target AWS OpenSearch clusters with zero production downtime. Enforced rigorous FedRAMP compliance controls including FIPS 140-2 encryption, automated snapshot lifecycles, and fine-grained IAM access control via Terraform. Engineered OpenSearch Index State Management (ISM) policies to transition aging log indexes through hot, warm, and cold storage tiers, cutting infrastructure storage expenditures by 35% while preserving instant search availability.',
        challenge: 'Migrating production search infrastructure to managed AWS OpenSearch within an AWS GovCloud environment required zero data loss, strict adherence to federal regulatory security baselines (FedRAMP Moderate), and minimal downtime during cutover.',
        approach: [
            'Architected a highly resilient dual-write pipeline using AWS SQS message queues, allowing both legacy Elasticsearch and target AWS OpenSearch clusters to receive indexing events simultaneously.',
            'Enforced FedRAMP Moderate baseline requirements, including FIPS 140-2 encryption at rest and in transit, VPC endpoint isolation, and least-privilege IAM policies with AWS KMS customer-managed keys.',
            'Configured OpenSearch Index State Management (ISM) to automate rollover, shrink, and transition of indexes from hot NVMe nodes to warm and cold storage tiers.',
            'Developed automated data-validation and count-reconciliation scripts in Python to confirm document parity between clusters prior to final DNS switchover.'
        ],
        outcome: 'Successfully cut over search workloads in AWS GovCloud with zero document loss and no production downtime, while achieving full compliance verification under FedRAMP audit criteria.',
        stack: ['AWS OpenSearch', 'AWS SQS', 'Python', 'AWS GovCloud', 'Terraform', 'IAM'],
        keywords: 'opensearch migration fedramp govcloud compliance aws opensearch aws sqs python terraform iam elasticsearch kms fips ism zero downtime cisco'
    },
    {
        id: 'yjmqs',
        order: 4,
        title: 'WooCommerce Google Analytics Pro Plugin',
        category: 'web',
        categories: 'web',
        metaPill: 'Open-Source & E-Commerce Engineering · Tatvic Analytics',
        summary: 'Architected and launched the flagship WooCommerce Google Analytics Pro integration plugin, powering enterprise e-commerce tracking across more than 50,000 active digital storefronts. Engineered event-driven tracking hooks capturing comprehensive shopping behavior—including product impressions, detail views, cart additions, multi-step checkout funnels, and coupon redemptions—strictly adhering to Google Enhanced Ecommerce specifications. Implemented resilient client-side JavaScript tracking layers with robust localStorage fallbacks alongside server-side Measurement Protocol dispatchers to guarantee conversion attribution even when browser ad-blockers or content blockers intervened. Authored detailed technical onboarding guides and maintained rigorous unit and integration test matrices across WordPress and WooCommerce version releases.',
        challenge: 'E-commerce merchants needed reliable, out-of-the-box tracking for Google Analytics Enhanced Ecommerce on WooCommerce without manual code changes, while accommodating varied server configurations, high checkout concurrency, and different browser privacy settings.',
        approach: [
            'Engineered a modular WordPress/WooCommerce plugin hooking into core e-commerce lifecycle actions (product views, cart operations, checkout steps, order completion).',
            'Implemented dual tracking methods: client-side tracking via analytics.js / gtag.js and server-side fallback using the Google Analytics Measurement Protocol for transaction reliability.',
            'Built an intuitive administrative configuration panel inside WordPress settings for tracking ID validation, custom dimension mapping, and debugging mode toggles.',
            'Optimized payload construction and asynchronous script injection to prevent tracking logic from adding perceptible overhead to page render and checkout speed.'
        ],
        outcome: 'Adopted by tens of thousands of active e-commerce stores worldwide, significantly reducing merchant integration overhead and delivering reliable conversion and funnel reporting.',
        stack: ['PHP', 'JavaScript', 'WordPress Plugin API', 'WooCommerce Hooks', 'Google Analytics Measurement Protocol', 'MySQL', 'SVN / Git'],
        keywords: 'woocommerce google analytics pro plugin enhanced ecommerce wordpress php measurement protocol gtag tracking analytics'
    },
    {
        id: 'lztcg',
        order: 5,
        title: 'Google Analytics Anomaly Detection & Alerting System',
        category: 'data',
        categories: 'data',
        metaPill: 'Data Pipeline / Applied Analytics · Tatvic Analytics',
        summary: 'Architected an automated statistical anomaly detection and incident alerting engine monitoring key business metrics across high-volume digital properties. Developed automated extraction pipelines leveraging the Google Analytics Reporting REST API to ingest daily session, conversion, and bounce rate time series into a high-performance MongoDB and MySQL data store. Implemented seasonal decomposition and statistical outlier detection algorithms in Python using pandas and NumPy, benchmarking incoming metrics against rolling baseline ranges. Integrated automated notification dispatchers interfacing with Mandrill and transactional email APIs, alerting marketing directors and site reliability engineers within minutes of traffic drops or checkout anomalies.',
        challenge: 'Marketing and product teams lacked automated visibility into sudden drops or spikes in traffic, conversion rates, and revenue across complex web properties, often discovering tracking bugs or business anomalies days after they occurred.',
        approach: [
            'Built automated data collection jobs querying the Google Analytics Core Reporting API and storing historical metrics in MongoDB and MySQL.',
            'Applied time-series statistical models and rolling z-score analysis in Python to establish dynamic confidence intervals accounting for day-of-week seasonality.',
            'Designed a multi-channel alert dispatcher sending structured anomaly reports and diagnostic deep-links via email (Mandrill API) and internal messaging hooks.',
            'Created a self-service management UI where stakeholders could configure custom sensitivity thresholds, metric pairings, and alert recipients.'
        ],
        outcome: 'Replaced manual dashboard audits with proactive automated monitoring, reducing anomaly detection latency from days to hours and helping clients recover tens of thousands of dollars in lost conversion revenue.',
        stack: ['Python', 'pandas', 'NumPy', 'Google Analytics API', 'MongoDB', 'MySQL', 'Mandrill API', 'Cron / Linux'],
        keywords: 'google analytics anomaly detection alerting time series python pandas mandrill reporting zscore mongodb mysql'
    },
    {
        id: 'mpxtk',
        order: 6,
        title: 'Mobile Pixel Tracking & Churn/Uninstall Analytics',
        category: 'data',
        categories: 'data',
        metaPill: 'Data Engineering / Mobile · Tatvic Analytics',
        summary: 'Architected a purpose-built mobile telemetry and engagement data platform to capture high-resolution user interaction, silent push receipts, and uninstallation signals across native Android applications. Engineered a lightweight client SDK with memory-efficient event queueing, persistent SQLite staging, and resilient batch transmission to prevent device battery depletion and application runtime latency. Built cloud ingestion infrastructure on Amazon Web Services utilizing Amazon CloudFront, API Gateway, and Amazon S3 to reliably collect millions of daily device heartbeats and lifecycle markers without server bottlenecks. Developed serverless ETL processing workflows in Python and Amazon Athena to analyze telemetry streams, identify silent push notification drop-offs, and compute predictive user churn scores. Integrated automated cohort generation pipelines with customer engagement tools, empowering product managers and growth analysts to proactively trigger targeted retention campaigns weeks before anticipated user churn occurred.',
        challenge: 'Mobile product teams lacked reliable, low-overhead mechanisms to detect early user churn patterns, app uninstallations, and engagement drop-offs across heterogeneous Android device fleets without draining device batteries or impacting app startup times.',
        approach: [
            'Engineered a lightweight Android client SDK featuring SQLite-backed batch queueing, adaptive backoff timers, and silent FCM push receipt listeners.',
            'Constructed a resilient cloud ingestion endpoint using AWS CloudFront, API Gateway, and Amazon S3 capable of processing bursty mobile heartbeat traffic.',
            'Developed serverless data transformation and query pipelines using AWS Lambda, Python, and Amazon Athena to process daily telemetry partitions.',
            'Built predictive heuristic churn scoring models that flagged disengaged user segments based on silent push delivery failures and declining session frequencies.'
        ],
        outcome: 'Empowered consumer mobile application teams to detect app uninstallations within hours and proactively engage at-risk cohorts, lifting 30-day user retention rates across participating mobile apps.',
        stack: ['Android SDK', 'Java', 'AWS CloudFront', 'Amazon S3', 'API Gateway', 'Python', 'Amazon Athena', 'SQL'],
        keywords: 'mobile pixel tracking churn uninstall analytics android sdk java aws cloudfront s3 api gateway python athena sql'
    },
    {
        id: 'cazrv',
        order: 7,
        title: 'Centralized Authentication & Access Governance',
        category: 'security',
        categories: 'security',
        metaPill: 'Security & Access Governance · Cisco Systems',
        summary: 'Designed and enforced a unified identity, authentication, and access governance architecture across multi-tenant security data services and database infrastructure at Cisco Systems. Modernized disparate authentication mechanisms by implementing centralized authentication workflows integrating AWS Cognito and Okta/OIDC for secure user identity management and seamless SSO across internal dashboards. Governed database access by enforcing IAM-based auth across AWS Redshift and AWS RDS, coupled with automated credential hardening and rotation via AWS Secrets Manager. Configured least-privilege role-based access control (RBAC) definitions in Terraform mapped to enterprise directory groups, maintaining immutable audit trails with AWS CloudTrail and Python compliance scanners to achieve full audit readiness aligned with FedRAMP Moderate and AWS GovCloud mandates.',
        challenge: 'Decentralized database credentials, inconsistent local account provisioning, and sprawling IAM permissions across multi-region AWS environments posed security audit vulnerabilities and operational complexity for security data platforms.',
        approach: [
            'Implemented centralized authentication workflows integrating AWS Cognito and Okta/OIDC for secure user identity management and seamless SSO across internal dashboards.',
            'Governed database access by enforcing IAM-based auth across AWS Redshift and AWS RDS, coupled with credential hardening via AWS Secrets Manager.',
            'Implemented least-privilege Role-Based Access Control (RBAC) schemas in Terraform, eliminating hardcoded credentials in deployment manifests.',
            'Established continuous compliance audits utilizing AWS CloudTrail and Python verification scripts to flag unauthorized privilege escalation.'
        ],
        outcome: 'Eliminated static administrative database passwords across all production data stores, achieving 100% compliance adherence with federal security baselines and streamlining onboarding.',
        stack: ['AWS Cognito', 'AWS IAM', 'AWS RDS', 'AWS Redshift', 'Okta / OIDC', 'Terraform', 'Python'],
        keywords: 'centralized authentication access governance aws cognito aws iam aws rds aws redshift okta oidc terraform python secrets manager cloudtrail rbac fedramp cisco'
    },
    {
        id: 'phvdo',
        order: 8,
        title: 'Curated Video Discovery Web Platform',
        category: 'web',
        categories: 'web',
        metaPill: 'Independent Product Engineering · Web Application',
        summary: 'Conceived, built, and launched an independent, full-stack video curation platform engineered to help software engineers, designers, and students discover high-value technical lectures and educational productions without algorithmic recommendation distractions. Developed automated ingestion pipelines interfacing with YouTube and Vimeo public developer APIs to crawl, validate, and enrich video metadata in a high-performance MongoDB store. Created an algorithmic popularity engine that evaluated upvote momentum, watch completion velocity, and community commentary to compute dynamic daily leaderboards. Engineered a responsive single-page web client leveraging modern JavaScript and CSS, incorporating keyboard-driven navigation, embedded media playback, and social curation tools. Deployed the platform with Redis caching layers to withstand traffic spikes, culminating in a successful public launch on Product Hunt where the application earned a featured showcase and attracted thousands of active daily visitors.',
        challenge: 'Engineers, designers, and researchers struggled to discover high-signal technical conferences, design breakdowns, and coding masterclasses amidst algorithmic video feed clutter, clickbait titles, and entertainment recommendations.',
        approach: [
            'Built an automated ingestion pipeline in Node.js integrating YouTube and Vimeo developer APIs to harvest high-definition technical content and captions.',
            'Designed a community ranking algorithm factoring upvote velocity, watch duration signals, and topic tags into real-time leaderboard positions.',
            'Engineered a responsive single-page web interface with custom HTML5 video controls, keyboard shortcuts, and bookmarking queues.',
            'Optimized data retrieval with Redis caching and deployed the application on scalable cloud infrastructure with automated SSL and CDN caching.'
        ],
        outcome: 'Successfully launched on Product Hunt, achieving featured ranking on launch day and attracting over 15,000 active monthly learners with high engagement retention.',
        stack: ['Node.js', 'Express', 'JavaScript', 'MongoDB', 'Redis', 'REST APIs', 'HTML5 Video', 'Product Hunt'],
        keywords: 'curated video discovery web platform product hunt nodejs express javascript mongodb redis youtube vimeo rest api html5 video'
    },
    {
        id: 'tgwnx',
        order: 9,
        title: '360-Degree Enterprise Customer Data View',
        category: 'data',
        categories: 'data',
        metaPill: 'Enterprise Data Platform · Tatvic Analytics',
        summary: 'Engineered an enterprise-scale identity resolution and unified analytics data pipeline consolidating disjointed customer touchpoints scattered across transactional billing databases, Salesforce CRM instances, web analytics, and customer support desks. Designed deterministic identity stitching algorithms in Python and SQL that mapped disparate identifiers—including hashed emails, phone tokens, device UUIDs, and account numbers—into singular, canonical customer records. Constructed scheduled and event-triggered ETL pipelines using Apache Airflow and Amazon Redshift, orchestrating automated data ingestion, multi-touch conversion attribution modeling, and customer lifetime value computation. Delivered automated reporting feeds and interactive business intelligence dashboards allowing client account executives and retention strategists to track customer engagement health, detect account decay, and target renewal interventions. Slashed multi-system manual reporting reconciliation cycles from multiple days to near-real-time automated syncs across millions of customer accounts.',
        challenge: 'Enterprise sales, support, and marketing teams operated in information silos, unable to correlate digital website behavior with CRM opportunities, payment transaction logs, and ticketing histories for key accounts.',
        approach: [
            'Designed a deterministic identity-stitching algorithm resolving phone numbers, hashed emails, customer IDs, and cookie UUIDs into canonical user profiles.',
            'Built scheduled ETL pipelines with Apache Airflow to extract, validate, and load records from Salesforce, MySQL, and Google Analytics into Amazon Redshift.',
            'Calculated recency, frequency, monetary (RFM) metrics, customer health scores, and multi-touch marketing attribution directly within warehouse queries.',
            'Exposed aggregated customer profile views via REST microservices to power client-facing account dashboards and CRM embedded views.'
        ],
        outcome: 'Delivered an authoritative 360-degree customer profile across millions of records, eliminating hours of manual data reconciliation for enterprise account managers.',
        stack: ['Python', 'SQL', 'Amazon Redshift', 'ETL / ELT', 'Salesforce API', 'Google Analytics', 'Apache Airflow'],
        keywords: '360 degree enterprise customer view identity resolution redshift salesforce api airflow etl elt python sql google analytics'
    },
    {
        id: 'rkzby',
        order: 10,
        title: 'Lead-Gen & Repeat-Visit Behavioral Engine',
        category: 'data',
        categories: 'data',
        metaPill: 'Applied Machine Learning · Tatvic Analytics',
        summary: 'Built an algorithmic behavioral intelligence engine designed to distinguish high-propensity prospective buyers from casual digital browsers by analyzing micro-interactions throughout the user journey. Extracted and normalized multi-dimensional clickstream telemetry—including scroll velocities, page transition latencies, category dwell times, and repeated search queries—from Google Analytics and custom tag deployments. Developed predictive classification models in Python using scikit-learn and pandas to estimate repeat-visit likelihood and 7-day conversion propensity scores across incoming visitor sessions. Formulated automated webhooks and tag manager integrations dispatching dynamic scores into CRM queues and advertising platforms, enabling real-time personalized site banners and automated email sequences. Validated model accuracy and revenue uplift through structured multi-variant A/B experiments, lifting client retargeting campaign conversion rates by over 28% while reducing overall paid advertising acquisition expenditures.',
        challenge: 'Online service providers and high-ticket B2B businesses struggled with high ad spend on generic retargeting campaigns because they could not distinguish high-intent visitors from low-intent casual web traffic.',
        approach: [
            'Engineered custom behavioral telemetry instrumentation in Google Tag Manager tracking micro-interactions (scroll depth, pricing page dwell, documentation queries).',
            'Trained supervised machine learning models in Python using scikit-learn (Random Forest, Logistic Regression) on historical conversion sessions.',
            'Built real-time scoring hooks dispatching propensity tiers directly into Google Analytics custom dimensions and client marketing automation tools.',
            'Executed controlled A/B testing campaigns tailoring dynamic promotional offers and personalized chat prompts to high-propensity segments.'
        ],
        outcome: 'Boosted marketing conversion rates by 28% on targeted user segments while lowering overall retargeting ad expenditure by filtering out cold, low-propensity traffic.',
        stack: ['Python', 'scikit-learn', 'pandas', 'Google Analytics', 'Google Tag Manager', 'REST APIs', 'A/B Testing', 'SQL'],
        keywords: 'lead gen repeat visit behavioral engine propensity scoring machine learning scikit-learn pandas google analytics gtm ab testing conversion optimization'
    },
    {
        id: 'vjmsp',
        order: 11,
        title: 'Dynamic Pricing & Competitive Intelligence Engine',
        category: 'data',
        categories: 'data web',
        metaPill: 'Data Engineering & Algorithms · Tatvic Analytics',
        summary: 'Architected a high-throughput competitive intelligence and dynamic pricing engine allowing e-commerce retail enterprises to monitor price shifts across competing storefronts and automatically recalculate optimal product prices. Built distributed web harvesting infrastructure utilizing Python, Scrapy, and Selenium with automated proxy rotation, user-agent spoofing, and rate-limiting policies to extract real-time pricing, stock availability, and shipping costs. Engineered SKU normalization algorithms resolving heterogeneous vendor nomenclature into standardized canonical catalog entries. Formulated a configurable rules engine in Python evaluating inventory depth, wholesale cost floors, competitor margins, and demand elasticity to recommend pricing actions in real time. Implemented asynchronous task orchestration with Celery and Redis, exposing REST API endpoints and webhooks that fed automated price updates directly into merchant ERP and inventory management platforms.',
        challenge: 'Retail and e-commerce clients faced intense price volatility across digital marketplaces and competing storefronts. Relying on manual price audits caused delayed responses, lost sales rank, and compressed profit margins when competitor discounts went unnoticed.',
        approach: [
            'Architected a distributed data harvesting platform utilizing Scrapy, Selenium, and proxy rotation to extract pricing, shipping, and availability data across competitor sites.',
            'Engineered automated SKU normalization algorithms mapping heterogeneous vendor naming conventions and product attributes into a unified canonical catalog.',
            'Designed an algorithmic pricing rules engine incorporating inventory levels, minimum margin thresholds, and market demand elasticity to compute optimal price recommendations.',
            'Developed asynchronous Celery task queues backed by Redis and PostgreSQL with REST webhooks feeding price updates directly into merchant ERP catalogs.'
        ],
        outcome: 'Automated competitive intelligence across tens of thousands of active SKUs, cutting price-adjustment latency from days to under thirty minutes and boosting both sales velocity and preserved margin.',
        stack: ['Python', 'Scrapy', 'Selenium', 'Redis', 'PostgreSQL', 'Celery', 'REST APIs', 'AWS EC2'],
        keywords: 'dynamic pricing competitive intelligence engine scrapy selenium python redis postgresql celery rest apis aws ec2 sku normalization'
    },
    {
        id: 'edxql',
        order: 12,
        title: 'edx-dl: Open-Source Educational Content Downloader',
        category: 'web',
        categories: 'web',
        metaPill: 'Open-Source Engineering & Community Tooling',
        summary: 'Served as an active core contributor and maintainer of edx-dl, a widely acclaimed open-source Python command-line utility built to parse, index, and download complete courseware packages from the edX educational platform for offline study. Implemented robust session handling supporting multi-factor authentication, OAuth token exchange, and persistent cookie jar management. Developed multi-threaded chunked download pipelines with byte-range resume capability, supporting complex video streaming manifests (HLS, DASH, MP4) and automated multilingual subtitle extraction. Embedded courteous rate limiting, exponential backoff policies, and socket timeout retries to prevent platform resource strain and account throttling. Maintained comprehensive cross-platform regression test suites, authored detailed technical documentation, and managed public release distributions via PyPI, fostering an active international developer community and earning thousands of GitHub stars from users worldwide.',
        challenge: 'Students, educators, and software engineers in developing countries and areas with unreliable or metered internet connectivity frequently experienced interrupted video streams, making coursework completion difficult without reliable local offline access to lecture assets.',
        approach: [
            'Contributed core engineering and maintenance to edx-dl, a Python CLI tool handling course parsing, syllabus traversal, and multi-session OAuth cookie management.',
            'Engineered multi-threaded chunked downloads with automatic byte-range resume support for fragmented video formats (HLS/DASH/MP4) and subtitle parsing (.srt/vtt).',
            'Implemented rate limiting, exponential backoff, and polite user-agent rotation to protect host platforms from accidental denial of service.',
            'Maintained community release packaging via PyPI, handled GitHub pull request reviews, and established automated cross-platform test suites.'
        ],
        outcome: 'Evolved into one of the most widely used open-source educational utilities on GitHub with thousands of stars and community contributors, facilitating offline education for thousands of students worldwide.',
        stack: ['Python', 'BeautifulSoup', 'Requests', 'Regex', 'youtube-dl / ffmpeg', 'PyPI / Git', 'CLI Tooling', 'Bash'],
        keywords: 'edx dl open source course downloader cli python beautifulsoup requests youtube-dl ffmpeg pypi community tooling bash'
    },
    {
        id: 'zskrw',
        order: 13,
        title: 'Enterprise Security Remediation & Mailbox Protection',
        category: 'security',
        categories: 'security',
        metaPill: 'Security Engineering & Endpoint Integration · Cisco Systems',
        summary: 'Engineered an automated post-delivery threat remediation and end-user security incident reporting platform protecting enterprise mailboxes against zero-day phishing attacks and weaponized emails at Cisco Systems. Built an automated search-and-destroy service that triggered immediate retroactive message clawbacks across distributed Microsoft 365 and Exchange environments whenever newly identified Indicators of Compromise (IOCs) were published by threat intelligence feeds. Developed a cross-platform Outlook add-in using TypeScript, Office.js, and Microsoft Graph APIs enabling enterprise employees to flag suspicious emails directly to security analysts with one click. Designed backend quarantine queues and administrative review workflows backed by PostgreSQL and Celery with strict role authorization and tamper-evident audit logging. Compressed incident response times for weaponized emails from hours of manual SOC hunting to seconds of automated remediation.',
        challenge: 'When newly weaponized attacks or zero-day phishing campaigns bypassed initial perimeter defenses prior to threat feed updates, enterprise security operations lacked automated mechanisms to instantly hunt, quarantine, and retract delivered malicious messages across thousands of employee mailboxes.',
        approach: [
            'Engineered an automated post-delivery remediation service triggering retroactive search-and-destroy actions when new Indicators of Compromise (IOCs) are published.',
            'Developed a cross-platform Outlook add-in utilizing Office.js and Microsoft Graph API enabling end users to report suspicious emails directly to the SOC with one click.',
            'Constructed administrative quarantine and audit queues with role-based approval flows for high-risk message restoration or permanent purging.',
            'Built closed-loop feedback pipelines feeding user-reported phishing payloads directly into scanning and threat intelligence engines to accelerate signature deployment.'
        ],
        outcome: 'Compressed the remediation lifecycle for newly identified malicious email campaigns from hours of manual SOC hunting down to seconds of automated purge actions, significantly containing lateral attack spread across enterprise mailboxes.',
        stack: ['Python', 'TypeScript / Office.js', 'Microsoft Graph API', 'REST APIs', 'Celery', 'PostgreSQL', 'Docker', 'AWS'],
        keywords: 'enterprise security remediation mailbox protection cisco systems outlook add-in officejs microsoft graph api celery postgresql docker python'
    }
];

export function getProjectById(id: string): Project | undefined {
    return projects.find(p => p.id === id);
}

export function getAdjacentProjects(id: string) {
    const currentIndex = projects.findIndex(p => p.id === id);
    if (currentIndex === -1) return { prev: undefined, next: undefined };
    
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    
    return {
        prev: projects[prevIndex],
        next: projects[nextIndex]
    };
}
