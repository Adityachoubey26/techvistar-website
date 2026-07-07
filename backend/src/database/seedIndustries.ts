/**
 * @file src/database/seedIndustries.ts
 * @description Production seed — matches frontend/src/data/industries.ts exactly.
 *
 * Field mapping (adapter field → seed field):
 *   industry.description   → fullDescription
 *   industry.challenges    → whyChooseUs[{title,description}]
 *   industry.solutions     → detailedOfferings[{title,description}]
 *   industry.statistics    → stats[{value,label}]
 *   industry.heroImage     → coverImage (direct Unsplash URL — adapter passes through https://)
 *   industry.services      → industries[] (service slugs)
 *   industry.technologies  → technologies[]
 *   industry.faqs          → faqs[{question,answer}]
 *   industry.cta.title     → ctaLabel
 *   industry.cta.subtitle  → overview
 *   industry.overviewQuote → overviewQuote (italic block under Overview on details page)
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Industry } from '../models/Industry';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techvistar';

const INDUSTRIES_DATA = [
  // ─── 1. HEALTHCARE ────────────────────────────────────────────────────────
  {
    title: 'Healthcare',
    slug: 'healthcare',
    category: 'Life Sciences',
    shortDescription: 'HIPAA-compliant custom software, telehealth portals, and AI diagnostics built for modern medicine.',
    fullDescription: 'We design and build secure, regulatory-compliant digital systems for healthcare providers, medical device manufacturers, and healthtech startups. From EHR integrations and remote patient monitoring to telehealth apps and medical billing systems, our solutions prioritize data security, interoperability, and fluid patient experiences.',
    overview: 'Schedule a call with our healthtech compliance architects.',
    overviewQuote: 'Building secure healthcare ecosystems that improve patient outcomes.',
    icon: 'Heart',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 1,
    status: 'active',
    featured: true,
    industries: ['web-development', 'mobile-app-development', 'ui-ux-design', 'ai-automation'],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'FHIR API standards', 'AWS KMS'],
    features: ['HIPAA Compliance', 'Electronic Health Records (EHR)', 'Telehealth Integrations'],
    benefits: ['Reduced administrative costs', 'Improved patient engagement', 'Enhanced data privacy'],
    ctaLabel: 'Ready to build a secure medical platform?',
    whyChooseUs: [
      {
        title: 'HIPAA & GDPR Compliance',
        description: 'Healthcare organizations face strict regulations regarding patient data security and transmission, with severe penalties for non-compliance.'
      },
      {
        title: 'Fragmented Legacy Systems',
        description: 'Connecting new digital solutions to older Electronic Health Record (EHR) systems like Epic or Cerner often results in significant integration overhead.'
      },
      {
        title: 'User Adoption Barriers',
        description: 'Clinicians and patient populations have widely varying technical competencies, necessitating highly accessible and friction-free user interfaces.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Encrypted Telehealth Portals',
        description: 'End-to-end encrypted video channels and messaging lines that satisfy security guidelines while delivering intuitive patient onboarding.'
      },
      {
        title: 'FHIR API & HL7 Integrations',
        description: 'Standardized medical data pipelines allowing seamless patient record exchanges across clinics, pharmacies, and insurance providers.'
      },
      {
        title: 'Accessibility-First UI Design',
        description: 'Clean layouts that adhere strictly to WCAG Guidelines, supporting screen readers, adjustable text sizing, and high-contrast styling.'
      }
    ],
    stats: [
      { value: '99.99%', label: 'System Uptime', iconType: 'shield', colorTheme: 'green' },
      { value: '100%', label: 'HIPAA Auditable', iconType: 'lock', colorTheme: 'blue' }
    ],
    faqs: [
      {
        question: 'Are your digital healthcare products HIPAA-compliant?',
        answer: 'Yes, all our healthcare systems implement AES-256 data encryption at rest and TLS 1.3 in transit, and are hosted on HIPAA-eligible server infrastructures like AWS or Google Cloud with full auditing logs.'
      },
      {
        question: 'Can you integrate with existing EHR systems?',
        answer: 'We construct custom API layers supporting HL7 and FHIR standards to safely read and write clinical records from legacy platforms without compromising data integrity.'
      }
    ],
    process: [
      { step: 1, title: 'HIPAA Audit & Strategy', description: 'Analyze clinical workflows and data lifecycle constraints.' },
      { step: 2, title: 'Integration & Coding', description: 'Build clinical dashboards with FHIR interoperability standards.' }
    ]
  },

  // ─── 2. EDUCATION ─────────────────────────────────────────────────────────
  {
    title: 'Education',
    slug: 'education',
    category: 'EdTech',
    shortDescription: 'Scalable LMS platforms, virtual classrooms, and interactive educational content delivery networks.',
    fullDescription: 'We develop learning management systems (LMS), student information systems (SIS), and online education platforms that make learning interactive, accessible, and scalable. Our systems support rich media delivery, automated student tracking, and gamified assessments.',
    overview: 'Build a custom, high-performance learning ecosystem.',
    overviewQuote: 'Creating engaging digital learning experiences for modern institutions.',
    icon: 'GraduationCap',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 2,
    status: 'active',
    featured: true,
    industries: ['web-development', 'ui-ux-design', 'cloud-devops'],
    technologies: ['Next.js', 'GraphQL', 'TailwindCSS', 'Serverless Functions', 'Mux Video', 'PostgreSQL'],
    features: ['Custom student dashboards', 'Virtual classroom whiteboards', 'Auto-grading pipelines'],
    benefits: ['Higher student engagement', 'Streamlined grading work', 'Scalable content delivery'],
    ctaLabel: 'Elevate your learning experience today',
    whyChooseUs: [
      {
        title: 'Scalability During Peak Hours',
        description: 'LMS platforms experience immense traffic spikes during exams and morning lectures, causing performance degradation.'
      },
      {
        title: 'Maintaining Student Engagement',
        description: 'Virtual classrooms often struggle to keep students active and focused compared to face-to-face instruction.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Serverless Auto-Scaling Pipelines',
        description: 'Infrastructure that scales up resources dynamically in response to traffic surges, ensuring zero downtime.'
      },
      {
        title: 'Gamified Interactive Portals',
        description: 'LMS layouts incorporating badges, real-time quizzes, progress visualization, and community discussion boards.'
      }
    ],
    stats: [
      { value: '50%+', label: 'Engagement Increase', iconType: 'chart', colorTheme: 'purple' },
      { value: '10k+', label: 'Concurrent Users', iconType: 'users', colorTheme: 'blue' }
    ],
    faqs: [
      {
        question: 'Do your platforms support SCORM and LTI standards?',
        answer: 'Yes, we build our custom systems to integrate smoothly with standard SCORM and LTI packages for seamless courseware interoperability.'
      }
    ],
    process: [
      { step: 1, title: 'Curriculum Analysis', description: 'Evaluate virtual content modules and assignment structures.' },
      { step: 2, title: 'Portal Customization', description: 'Integrate live streaming and chat options.' }
    ]
  },

  // ─── 3. FINANCE ───────────────────────────────────────────────────────────
  {
    title: 'Finance',
    slug: 'finance',
    category: 'FinTech',
    shortDescription: 'Bank-grade security fintech systems, custom accounting platforms, and payment integrations.',
    fullDescription: 'We construct secure fintech products, transaction ledgers, investment dashboards, and custom banking modules. Our platforms utilize strong security controls, multi-factor authorization, and real-time transaction processing.',
    overview: 'Build a secure, modern, and reliable financial interface.',
    overviewQuote: 'Delivering trusted fintech platforms built for scale.',
    icon: 'Landmark',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 3,
    status: 'active',
    featured: false,
    industries: ['web-development', 'mobile-app-development', 'ui-ux-design', 'ai-automation'],
    technologies: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Stripe API', 'OAuth 2.0'],
    features: ['Zero-trust Architecture', 'Event-driven Ledger', 'Multi-factor Auth'],
    benefits: ['Zero breach record', 'Faster transactions', 'Regulatory compliance'],
    ctaLabel: 'Discuss your fintech project',
    whyChooseUs: [
      {
        title: 'High-Value Security Risks',
        description: 'Financial products represent primary targets for cybercriminals, demanding absolute security compliance.'
      },
      {
        title: 'Real-Time Syncing Bottlenecks',
        description: 'Delayed balance updates or double-transfers can lead to financial losses and severe compliance penalties.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Zero-Trust Architecture',
        description: 'Multi-factor authentication, biometric logins, and tokenized APIs protecting user assets and sessions.'
      },
      {
        title: 'Event-Driven Ledger Systems',
        description: 'Transactional databases that verify account balances sequentially with absolute consistency rules.'
      }
    ],
    stats: [
      { value: '0', label: 'Security Breaches', iconType: 'shield', colorTheme: 'green' },
      { value: '2.5x', label: 'Processing Speed', iconType: 'bolt', colorTheme: 'gold' }
    ],
    faqs: [
      {
        question: 'What payment gateways do you support?',
        answer: 'We integrate with global processors like Stripe, Adyen, and PayPal, alongside custom bank transfers (ACH/SEPA) and regional payment APIs.'
      }
    ],
    process: [
      { step: 1, title: 'Security Architecture', description: 'Design zero-trust boundaries and access control layers.' },
      { step: 2, title: 'Ledger & Integration', description: 'Build event-driven transaction and audit systems.' }
    ]
  },

  // ─── 4. RETAIL & E-COMMERCE ────────────────────────────────────────────────
  {
    title: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    category: 'Commerce',
    shortDescription: 'High-conversion checkout funnels, head-less commerce solutions, and inventory tracking portals.',
    fullDescription: 'We engineer dynamic e-commerce platforms designed for lightning-fast speeds and high conversion rates. Our headless CMS solutions integrate product management, localized pricing, discount campaigns, and real-time inventory systems.',
    overview: 'Build a custom, high-speed storefront optimized for mobile and desktop conversions.',
    overviewQuote: 'Commerce moves at the speed of attention—we build storefronts and backends that convert intent into revenue without friction.',
    icon: 'ShoppingCart',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 4,
    status: 'active',
    featured: false,
    industries: ['web-development', 'ui-ux-design', 'digital-marketing', 'cloud-devops'],
    technologies: ['Next.js', 'Shopify Storefront API', 'Stripe', 'Algolia Search', 'TailwindCSS'],
    features: ['Headless commerce', 'Live inventory sync', 'CDN edge delivery'],
    benefits: ['Higher conversion rates', 'Near-instant load times', 'Real-time stock accuracy'],
    ctaLabel: 'Optimize your sales funnel',
    whyChooseUs: [
      {
        title: 'Slow Checkout Speeds',
        description: 'Every 100ms of latency during checkout results in a measurable drop in user conversion rate.'
      },
      {
        title: 'Inventory Syncing Delays',
        description: 'Failing to sync live inventory in real time across warehouse outlets can lead to customer disappointment.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Headless Frontend Architectures',
        description: 'React/Next.js store frontends served from global CDN edge networks for rapid load speeds.'
      },
      {
        title: 'Websocket Inventory Broadcasts',
        description: 'Live inventory telemetry that updates product stock counts automatically without page refreshes.'
      }
    ],
    stats: [
      { value: '35%+', label: 'Conversion Boost', iconType: 'chart', colorTheme: 'pink' },
      { value: '400ms', label: 'Average Load Time', iconType: 'bolt', colorTheme: 'blue' }
    ],
    faqs: [
      {
        question: 'Can you migrate our store from Shopify to a headless setup?',
        answer: 'Yes, we specialize in building headless Next.js frontends that pull product data directly from Shopify or BigCommerce APIs.'
      }
    ],
    process: [
      { step: 1, title: 'Store Audit', description: 'Evaluate current funnel drop-off points and speed bottlenecks.' },
      { step: 2, title: 'Headless Build', description: 'Deploy edge-optimized storefronts with live inventory hooks.' }
    ]
  },

  // ─── 5. MANUFACTURING ──────────────────────────────────────────────────────
  {
    title: 'Manufacturing',
    slug: 'manufacturing',
    category: 'Industrial',
    shortDescription: 'Industrial telemetry pipelines, warehouse optimization systems, and predictive maintenance portals.',
    fullDescription: 'We develop custom manufacturing Execution Systems (MES), IoT dashboard interfaces, and predictive equipment maintenance planners. We make operational floor data readable, helping factories reduce downtime and optimize supply throughput.',
    overview: 'Talk to our IoT architects about building custom monitoring dashboards.',
    overviewQuote: 'Accelerating Industry 4.0 transformation through connected digital solutions.',
    icon: 'Factory',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 5,
    status: 'active',
    featured: false,
    industries: ['web-development', 'ai-automation', 'custom-software-development'],
    technologies: ['Python', 'MQTT Brokers', 'TimescaleDB', 'Docker', 'React', 'D3.js'],
    features: ['Predictive maintenance', 'IoT middleware', 'OEE dashboards'],
    benefits: ['Reduced downtime', 'Better throughput', 'Lower maintenance costs'],
    ctaLabel: 'Digitize your factory floor',
    whyChooseUs: [
      {
        title: 'Unplanned Equipment Downtime',
        description: 'Unexpected machine breakdowns cost manufacturers billions annually in delayed deliveries and repair costs.'
      },
      {
        title: 'Disconnected IoT Devices',
        description: 'Factories operate hundreds of legacy hardware models that report sensor metrics in siloed formats.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Predictive Alert Telemetry',
        description: 'Ingesting sensor temperatures, vibrations, and run-times to flag anomalies before failures occur.'
      },
      {
        title: 'Unified IoT Middleware',
        description: 'Custom industrial hubs translating various telemetry protocols into structured, readable JSON records.'
      }
    ],
    stats: [
      { value: '22%', label: 'Downtime Reduction', iconType: 'chart', colorTheme: 'orange' },
      { value: '1M+', label: 'Daily Telemetry Points', iconType: 'database', colorTheme: 'amber' }
    ],
    faqs: [
      {
        question: 'Can you interface with Modbus or OPC UA equipment?',
        answer: 'Yes, we build middleware bridges that extract data from common PLC networks and pipe it into web-based dashboards.'
      }
    ],
    process: [
      { step: 1, title: 'Floor Mapping', description: 'Audit equipment sensors and communication protocols.' },
      { step: 2, title: 'Middleware Build', description: 'Deploy protocol bridges and real-time analytics dashboards.' }
    ]
  },

  // ─── 6. REAL ESTATE ────────────────────────────────────────────────────────
  {
    title: 'Real Estate',
    slug: 'real-estate',
    category: 'PropTech',
    shortDescription: 'Virtual tour portals, custom CRM dashboards, and transaction management platforms.',
    fullDescription: 'We build digital solutions for real estate developers, agencies, and proptech startups. Our services include property listings, search engines, CRM dashboards, and digital contract signing.',
    overview: 'Build custom property search portals and broker systems.',
    overviewQuote: 'Property technology must bridge brokers, buyers, and data—we create portals that make complex transactions feel effortless.',
    icon: 'Home',
    coverImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 6,
    status: 'active',
    featured: false,
    industries: ['web-development', 'mobile-app-development', 'ui-ux-design'],
    technologies: ['React', 'Elasticsearch', 'Node.js', 'PostgreSQL', 'Google Maps API'],
    features: ['Faceted property search', 'Agent CRM', 'Virtual tours'],
    benefits: ['Higher lead retention', 'Faster property discovery', 'Streamlined communications'],
    ctaLabel: 'Launch your proptech platform',
    whyChooseUs: [
      {
        title: 'Outdated Listing Interfaces',
        description: 'Slow property loading and poor search filtering lead to high bounce rates for buyers.'
      },
      {
        title: 'Scattered Communications',
        description: 'Brokers struggle to track calls, emails, and document statuses across separate apps.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Faceted Elasticsearch engines',
        description: 'Allows buyers to filter thousands of properties by price, square footage, and location instantly.'
      },
      {
        title: 'Integrated Agent CRMs',
        description: 'A unified broker dashboard linking customer chat histories with document templates.'
      }
    ],
    stats: [
      { value: '40%', label: 'Leads Retention', iconType: 'chart', colorTheme: 'cyan' },
      { value: '< 100ms', label: 'Filter Speed', iconType: 'bolt', colorTheme: 'blue' }
    ],
    faqs: [
      {
        question: 'Can you integrate MLS data feeds?',
        answer: 'Yes, we integrate IDX and RESO Web API feeds to dynamically update listing databases across your platform.'
      }
    ],
    process: [
      { step: 1, title: 'Platform Audit', description: 'Evaluate listing performance and user search patterns.' },
      { step: 2, title: 'Search Engine Build', description: 'Deploy Elasticsearch with geo-spatial filtering and MLS feeds.' }
    ]
  },

  // ─── 7. LOGISTICS ──────────────────────────────────────────────────────────
  {
    title: 'Logistics',
    slug: 'logistics',
    category: 'Supply Chain',
    shortDescription: 'Dynamic route optimization solvers, fleet tracking dashboards, and delivery systems.',
    fullDescription: 'We engineer complete dispatch systems, real-time vehicle trackers, and automated routing solvers for supply chains. Our platforms help operators optimize transit times and monitor active vehicles.',
    overview: 'Consult on building custom route optimization engines.',
    overviewQuote: 'Supply chains run on visibility—we engineer routing, tracking, and fulfillment systems that keep goods moving on time.',
    icon: 'Truck',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 7,
    status: 'active',
    featured: true,
    industries: ['web-development', 'mobile-app-development', 'custom-software-development', 'cloud-devops'],
    technologies: ['React', 'TypeScript', 'Mapbox GL', 'Go', 'Python', 'Websockets'],
    features: ['Route optimization', 'Live fleet tracking', 'ETA prediction'],
    benefits: ['Lower fuel costs', 'Higher on-time rates', 'Live visibility'],
    ctaLabel: 'Optimize your fleet operations',
    whyChooseUs: [
      {
        title: 'Inefficient Delivery Routes',
        description: 'Manual route planning leads to high fuel expenditures and late deliveries.'
      },
      {
        title: 'Low Operational Visibility',
        description: 'Dispatchers lack live status updates, making dispatch management reactive and chaotic.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Solver-Backed Route Optimizers',
        description: 'Calculates optimal multi-stop schedules under vehicle weight and delivery window limits.'
      },
      {
        title: 'Live Tracking Dashboards',
        description: 'Websocket-powered maps displaying active truck locations and ETA adjustments.'
      }
    ],
    stats: [
      { value: '18%', label: 'Fuel Savings', iconType: 'chart', colorTheme: 'violet' },
      { value: '98%', label: 'On-Time rate', iconType: 'check', colorTheme: 'green' }
    ],
    faqs: [
      {
        question: 'How accurate are the ETA calculations?',
        answer: 'We combine real-time traffic APIs with historic performance metadata to predict arrival times within a 5-minute window.'
      }
    ],
    process: [
      { step: 1, title: 'Fleet Analysis', description: 'Map existing dispatch workflows and route inefficiencies.' },
      { step: 2, title: 'Solver Deployment', description: 'Integrate optimization algorithms and live tracking feeds.' }
    ]
  },

  // ─── 8. AGRICULTURE ────────────────────────────────────────────────────────
  {
    title: 'Agriculture',
    slug: 'agriculture',
    category: 'AgriTech',
    shortDescription: 'Precision farming telemetry, crop health imaging dashboards, and market supply trackers.',
    fullDescription: 'We construct precision agriculture dashboards, IoT sensor monitors, and supply-chain databases for modern growers. We build systems that parse satellite images and field metrics to maximize crop outputs.',
    overview: 'Build smart monitoring systems with our agriculture software team.',
    overviewQuote: 'Modern agriculture runs on telemetry—we build field-to-cloud pipelines that help growers act before problems spread.',
    icon: 'Sprout',
    coverImage: 'https://images.unsplash.com/photo-1628102422497-6f9c69889a01?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1628102422497-6f9c69889a01?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1628102422497-6f9c69889a01?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 8,
    status: 'active',
    featured: false,
    industries: ['web-development', 'custom-software-development', 'ui-ux-design'],
    technologies: ['React', 'Leaflet', 'TimescaleDB', 'Python', 'GIS tools'],
    features: ['Soil sensor syncing', 'NDVI mapping', 'Weather integration'],
    benefits: ['Water conservation', 'Yield improvement', 'Disease prediction'],
    ctaLabel: 'Digitize your farming operation',
    whyChooseUs: [
      {
        title: 'Erratic Weather Factors',
        description: 'Growers struggle to adjust crop planning because weather metrics are siloed.'
      },
      {
        title: 'Unmonitored Soil Conditions',
        description: 'Irrigating without soil health data leads to water waste or crop disease.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Agronomic Sensor Syncing',
        description: 'Pipes soil moisture, humidity, and temperature data into interactive dashboards.'
      },
      {
        title: 'Spectral Imaging Maps',
        description: 'Visualizes normalized difference vegetation index (NDVI) mapping to track crop stress.'
      }
    ],
    stats: [
      { value: '30%', label: 'Water Conservation', iconType: 'droplet', colorTheme: 'green' },
      { value: '15%', label: 'Yield Improvement', iconType: 'chart', colorTheme: 'emerald' }
    ],
    faqs: [
      {
        question: 'Can the dashboard function offline in remote fields?',
        answer: 'Our mobile applications store telemetry metrics locally when offline and sync to the cloud once network connectivity is restored.'
      }
    ],
    process: [
      { step: 1, title: 'Field Survey', description: 'Assess sensor coverage and IoT connectivity requirements.' },
      { step: 2, title: 'Dashboard Build', description: 'Deploy NDVI imaging and agronomic monitoring dashboards.' }
    ]
  },

  // ─── 9. HOSPITALITY ────────────────────────────────────────────────────────
  {
    title: 'Hospitality',
    slug: 'hospitality',
    category: 'HospitalityTech',
    shortDescription: 'Custom hotel booking engines, CRM integrations, and mobile guest experience platforms.',
    fullDescription: 'We develop custom reservation platforms, digital concierge products, and guest engagement apps for hotel brands. Our systems integrate with Property Management Systems (PMS) to streamline guest check-ins.',
    overview: 'Build direct booking portals and custom guest check-in systems.',
    overviewQuote: 'Guest experience is earned in milliseconds—we design booking and service platforms that delight travelers at every touchpoint.',
    icon: 'Utensils',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 9,
    status: 'active',
    featured: false,
    industries: ['web-development', 'mobile-app-development', 'ui-ux-design'],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'PMS API Integrations'],
    features: ['Direct booking funnel', 'Digital concierge', 'PMS integration'],
    benefits: ['Higher direct bookings', 'Guest satisfaction', 'Lower OTA fees'],
    ctaLabel: 'Upgrade your guest experience',
    whyChooseUs: [
      {
        title: 'High OTA Commission Fees',
        description: 'Hotels lose up to 20% of revenue to Online Travel Agencies due to outdated direct booking options.'
      },
      {
        title: 'Fragmented Guest Services',
        description: 'Guests face delays ordering services because staff manage requests via paper logs or emails.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Optimized Booking Funnels',
        description: 'Fast, native-style booking steps that encourage customers to reserve directly.'
      },
      {
        title: 'Digital Concierge Apps',
        description: 'Mobile apps allowing guests to order room service or request keys with their phones.'
      }
    ],
    stats: [
      { value: '25%+', label: 'Direct Bookings', iconType: 'chart', colorTheme: 'amber' },
      { value: '94%', label: 'Guest Satisfaction', iconType: 'star', colorTheme: 'orange' }
    ],
    faqs: [
      {
        question: 'Do you integrate with standard Property Management Systems?',
        answer: 'Yes, we build custom integrations with popular PMS solutions like Opera, Cloudbeds, and Mews to sync reservations instantly.'
      }
    ],
    process: [
      { step: 1, title: 'Booking Audit', description: 'Identify OTA dependency and direct booking gaps.' },
      { step: 2, title: 'Funnel Deployment', description: 'Launch optimized booking engine and PMS integrations.' }
    ]
  },

  // ─── 10. ENERGY & UTILITIES ────────────────────────────────────────────────
  {
    title: 'Energy & Utilities',
    slug: 'energy-utilities',
    category: 'CleanTech',
    shortDescription: 'Smart grid telemetry, renewable energy dashboards, and utility asset management systems.',
    fullDescription: 'We build high-performance software for grid operators, solar/wind developers, and energy service providers. From IoT sensor pipelines to compliance reports, our systems optimize resource allocation.',
    overview: 'Consult with our smart grid telemetry engineers.',
    overviewQuote: 'The grid of tomorrow is software-defined—we deliver telemetry and control systems that balance reliability with sustainability.',
    icon: 'Zap',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
    dashboardImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
    displayOrder: 10,
    status: 'active',
    featured: false,
    industries: ['web-development', 'custom-software-development', 'cloud-devops'],
    technologies: ['React', 'TypeScript', 'TimescaleDB', 'Python', 'Go', 'Kafka'],
    features: ['Time-series telemetry', 'Grid balancing dashboards', 'Carbon audit reports'],
    benefits: ['Grid reliability', 'Faster compliance reporting', 'Renewable integration'],
    ctaLabel: 'Optimize your utility network',
    whyChooseUs: [
      {
        title: 'Grid Telemetry Overload',
        description: 'Operators process millions of metrics per second from smart meters, overloading legacy storage.'
      },
      {
        title: 'Distributed Generation Sync',
        description: 'Integrating fluctuating solar/wind resources requires rapid load-balancing and forecasting.'
      }
    ],
    detailedOfferings: [
      {
        title: 'Time-Series Data Lakes',
        description: 'Highly-optimized databases capable of storing and querying massive IoT telemetry instantly.'
      },
      {
        title: 'Live Balancing Dashboards',
        description: 'Real-time grid monitors tracking generation deficits and directing storage reserves.'
      }
    ],
    stats: [
      { value: '99.999%', label: 'Grid Reliability', iconType: 'shield', colorTheme: 'amber' },
      { value: '30%', label: 'Carbon Auditing Speedup', iconType: 'chart', colorTheme: 'green' }
    ],
    faqs: [
      {
        question: 'Do you support smart meter integrations?',
        answer: 'Yes, we integrate with industry-standard telemetry networks and AMI database APIs.'
      }
    ],
    process: [
      { step: 1, title: 'Grid Assessment', description: 'Audit meter data streams and storage bottlenecks.' },
      { step: 2, title: 'Telemetry Pipeline', description: 'Deploy time-series lakes and real-time monitoring dashboards.' }
    ]
  }
];

const CASE_STUDY_SLUGS: Record<string, string[]> = {
  healthcare: ['sustainability-dashboard'],
  finance: ['ecosystem-environmental-intelligence'],
  manufacturing: ['navigation-route-optimization'],
  logistics: ['navigation-route-optimization'],
  'energy-utilities': ['sustainability-dashboard'],
};

function prepareIndustrySeed(item: Record<string, unknown>) {
  const { ctaLabel, ...rest } = item;
  const slug = String(item.slug || '');

  const detailedOfferings = Array.isArray(item.detailedOfferings)
    ? item.detailedOfferings.map((entry: Record<string, unknown>) => ({
        title: String(entry.title || ''),
        description: String(entry.description || ''),
        badges: Array.isArray(entry.badges) ? entry.badges : [],
        color: String(entry.color || 'emerald'),
        iconName: String(entry.iconName || 'Check'),
      }))
    : [];

  const caseStudySlugs = CASE_STUDY_SLUGS[slug] || [];
  const caseStudies = caseStudySlugs.map((caseSlug) => ({
    title: caseSlug,
    slug: caseSlug,
    description: '',
    link: '',
  }));

  return {
    ...rest,
    cta: String(item.cta || ctaLabel || ''),
    detailedOfferings,
    caseStudies,
    faqs: Array.isArray(item.faqs) ? item.faqs : [],
  };
}

async function seedIndustries(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] ✅ Connected to MongoDB');

    const deleted = await Industry.deleteMany({});
    console.log(`[Seed] 🗑  Cleared ${deleted.deletedCount} existing industry records`);

    const prepared = INDUSTRIES_DATA.map((item) => prepareIndustrySeed(item as Record<string, unknown>));
    const inserted = await Industry.insertMany(prepared);
    console.log(`[Seed] ✅ Inserted ${inserted.length} industries:\n`);

    inserted.forEach((doc: { title: string; slug: string }, i: number) => {
      console.log(`  [${String(i + 1).padStart(2, '0')}] ${doc.title.padEnd(25)} slug: ${doc.slug}`);
    });

    console.log('\n[Seed] 🎉 Production seed complete — frontend will render identically to static data.');
  } catch (err) {
    console.error('[Seed] ❌ Error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed] Disconnected from MongoDB');
    process.exit(0);
  }
}

void seedIndustries();
