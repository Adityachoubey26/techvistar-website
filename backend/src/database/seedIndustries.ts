/**
 * @file src/database/seedIndustries.ts
 * @description Seeding script to populate the Industry collection in MongoDB Atlas.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Industry } from '../models/Industry';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techvistar';

const INDUSTRIES_DATA = [
  {
    title: 'Healthcare',
    slug: 'healthcare',
    category: 'Life Sciences',
    shortDescription: 'Enterprise software and HIPAA-compliant data platforms for digital healthcare systems.',
    fullDescription: 'Custom hospital management portals, electronic medical record systems, remote patient monitoring integrations, and telehealth consultation modules built to rigorous security standards.',
    overview: 'Modernizing healthcare infrastructure with secured data streaming, telehealth integrations, and compliance guardrails.',
    icon: 'Shield',
    coverImage: 'service_creative_design',
    thumbnail: 'service_creative_design',
    dashboardImage: 'overview_web_dev',
    displayOrder: 1,
    status: 'active',
    featured: true,
    features: ['HIPAA Compliance', 'Electronic Health Records (EHR)', 'Telehealth Integrations'],
    technologies: ['React', 'NodeJS', 'MongoDB', 'HL7/FHIR'],
    benefits: ['Reduced administrative costs', 'Improved patient engagement', 'Enhanced data privacy'],
    ctaLabel: 'Consult with Healthcare Experts',
    stats: [
      { value: '99.99%', label: 'Uptime SLA', iconType: 'shield', colorTheme: 'blue' },
      { value: 'HIPAA', label: 'Certified', iconType: 'lock', colorTheme: 'green' }
    ],
    process: [
      { step: 1, title: 'HIPAA Audit & Strategy', description: 'Analyze clinical workflows and data lifecycle constraints.' },
      { step: 2, title: 'Integration & Coding', description: 'Build clinical dashboards with FHIR interoperability standards.' }
    ]
  },
  {
    title: 'Education',
    slug: 'education',
    category: 'EdTech',
    shortDescription: 'LMS systems, virtual classrooms, and interactive learning products.',
    fullDescription: 'Interactive educational platforms, real-time assessment modules, virtual classroom whiteboards, and customizable student portals supporting remote learning.',
    overview: 'Empowering institutions with interactive digital learning frameworks and automated grading pipelines.',
    icon: 'Brain',
    coverImage: 'service_saas',
    thumbnail: 'service_saas',
    dashboardImage: 'clinical_risk_scoring',
    displayOrder: 2,
    status: 'active',
    featured: true,
    features: ['Custom student dashboards', 'Virtual classroom whiteboards', 'Auto-grading pipelines'],
    technologies: ['Vue', 'Express', 'WebRTC', 'MongoDB'],
    benefits: ['Higher student engagement', 'Streamlined grading work', 'Scalable content delivery'],
    ctaLabel: 'Build Your EdTech Platform',
    stats: [
      { value: '100k+', label: 'Active Students', iconType: 'user', colorTheme: 'purple' },
      { value: '25%', label: 'Grading Time Saved', iconType: 'clock', colorTheme: 'gold' }
    ],
    process: [
      { step: 1, title: 'Curriculum Analysis', description: 'Evaluate virtual content modules and assignment structures.' },
      { step: 2, title: 'Portal Customization', description: 'Integrate live streaming and chat options.' }
    ]
  },
  {
    title: 'Finance',
    slug: 'finance',
    category: 'FinTech',
    shortDescription: 'Next-gen analytics, wealth management, and transaction platforms.',
    fullDescription: 'Automated wealth management advisors, secure asset trading panels, dynamic risk evaluation charts, and localized tax calculating systems.',
    overview: 'Accelerating financial operations with secure microservice connections, custom reporting dashboards, and real-time alerts.',
    icon: 'Database',
    coverImage: 'service_cloud_infra',
    thumbnail: 'service_cloud_infra',
    dashboardImage: 'sentiment_nlp_dashboard',
    displayOrder: 3,
    status: 'active',
    featured: true,
    features: ['Automated microservices', 'Real-time alert channels', 'Advanced ledger trails'],
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Kafka'],
    benefits: ['Zero-friction settlements', 'Granular audit logging', 'Accelerated risk modeling'],
    ctaLabel: 'Optimize Financial Pipelines',
    stats: [
      { value: '$10M+', label: 'Volume Managed', iconType: 'credit-card', colorTheme: 'green' },
      { value: '4.9/5', label: 'Security Rating', iconType: 'shield', colorTheme: 'blue' }
    ],
    process: [
      { step: 1, title: 'Security Architecture', description: 'Design ledger partitions and audit tracking schemas.' },
      { step: 2, title: 'Microservice Deployment', description: 'Assemble core transaction pipelines.' }
    ]
  },
  {
    title: 'Banking',
    slug: 'banking',
    category: 'FinTech',
    shortDescription: 'Mobile banking interfaces, secure payment rails, and loan processing.',
    fullDescription: 'Feature-rich mobile applications, merchant processing web dashboards, automated loan evaluation workflows, and instant multi-currency settlement rails.',
    overview: 'Redefining personal banking experience with cross-platform native apps and automated fraud prevention modules.',
    icon: 'Cpu',
    coverImage: 'service_branding',
    thumbnail: 'service_branding',
    dashboardImage: 'clinical_risk_scoring',
    displayOrder: 4,
    status: 'active',
    featured: false,
    features: ['Instant settlement rails', 'Biometric validation', 'Automated fraud checks'],
    technologies: ['React Native', 'Kotlin', 'Spring Boot', 'MongoDB'],
    benefits: ['Instant loan evaluations', 'Frictionless customer support', 'Secured tokenized auth'],
    ctaLabel: 'Deploy Banking Applications',
    stats: [
      { value: '< 2s', label: 'Settlement Time', iconType: 'zap', colorTheme: 'gold' },
      { value: 'Zero', label: 'SLA Breaches', iconType: 'check', colorTheme: 'green' }
    ],
    process: [
      { step: 1, title: 'Regulatory Alignment', description: 'Review payment network specs and data storage constraints.' },
      { step: 2, title: 'Biometric Rollout', description: 'Connect secured tokenized APIs.' }
    ]
  },
  {
    title: 'Retail',
    slug: 'retail',
    category: 'Commerce',
    shortDescription: 'Omnichannel e-commerce engines, POS integrations, and loyalty platforms.',
    fullDescription: 'Custom headless storefronts, synchronized POS dashboard apps, automated loyalty program engines, and AI-driven recommenders.',
    overview: 'Integrating physical and digital commerce with fast headless pages and multi-inventory synchronization.',
    icon: 'Globe',
    coverImage: 'service_creative_design',
    thumbnail: 'service_creative_design',
    dashboardImage: 'overview_web_dev',
    displayOrder: 5,
    status: 'active',
    featured: false,
    features: ['Headless storefronts', 'Loyalty reward engines', 'Real-time stock sync'],
    technologies: ['NextJS', 'Shopify Plus API', 'MongoDB', 'Redis'],
    benefits: ['Increased conversion rate', 'Optimized stock levels', 'Higher repeat purchase rate'],
    ctaLabel: 'Grow Online Sales',
    stats: [
      { value: '1.2s', label: 'Average Page Load', iconType: 'zap', colorTheme: 'green' },
      { value: '3x', label: 'Loyalty Retention', iconType: 'star', colorTheme: 'gold' }
    ],
    process: [
      { step: 1, title: 'Omnichannel Blueprint', description: 'Map inventory touchpoints and localized POS APIs.' },
      { step: 2, title: 'Headless Assembly', description: 'Integrate Next.js frontend with shopping cart microservices.' }
    ]
  },
  {
    title: 'Manufacturing',
    slug: 'manufacturing',
    category: 'Industrial',
    shortDescription: 'IoT-enabled tracking, predictive maintenance, and supplier portals.',
    fullDescription: 'Real-time assembly line telemetry panels, predictive equipment maintenance alerts, vendor portal platforms, and supply chain tracking hubs.',
    overview: 'Connecting factory floors to management consoles with lightweight IoT messaging protocols.',
    icon: 'Workflow',
    coverImage: 'service_devops',
    thumbnail: 'service_devops',
    dashboardImage: 'sustainability_dashboard',
    displayOrder: 6,
    status: 'active',
    featured: false,
    features: ['IoT telemetry telemetry', 'Supply chain tracking hubs', 'Predictive alerts'],
    technologies: ['Angular', 'NodeJS', 'MQTT', 'InfluxDB'],
    benefits: ['Minimized assembly downtime', 'Improved parts tracking', 'Frictionless vendor updates'],
    ctaLabel: 'Connect Your Factory Floor',
    stats: [
      { value: '18%', label: 'Efficiency Increase', iconType: 'trending-up', colorTheme: 'blue' },
      { value: 'Zero', label: 'Unplanned Outages', iconType: 'check-circle', colorTheme: 'green' }
    ],
    process: [
      { step: 1, title: 'Telemetry Audit', description: 'Identify physical sensor configurations and bandwidth bounds.' },
      { step: 2, title: 'Data Streaming Build', description: 'Set up InfluxDB time-series storage and real-time alerts.' }
    ]
  },
  {
    title: 'Logistics',
    slug: 'logistics',
    category: 'Supply Chain',
    shortDescription: 'Fleet tracking modules, route optimization apps, and automated warehouse grids.',
    fullDescription: 'Interactive fleet maps with GPS monitoring, smart routing engines, warehouse stock tracking software, and vendor billing portals.',
    overview: 'Optimizing delivery transit times with intelligent routing calculations and real-time vehicle telemetry.',
    icon: 'Layers',
    coverImage: 'service_saas',
    thumbnail: 'service_saas',
    dashboardImage: 'mobility_routing_dashboard',
    displayOrder: 7,
    status: 'active',
    featured: false,
    features: ['GPS fleet tracking', 'Smart routing algorithms', 'Warehouse stock grids'],
    technologies: ['React', 'Express', 'PostGIS', 'MongoDB'],
    benefits: ['Reduced fuel consumption', 'Faster delivery SLA rates', 'Lower warehouse discrepancies'],
    ctaLabel: 'Optimize Fleet Logistics',
    stats: [
      { value: '14%', label: 'Fuel Saved', iconType: 'arrow-down', colorTheme: 'green' },
      { value: '99.8%', label: 'On-time Deliveries', iconType: 'clock', colorTheme: 'blue' }
    ],
    process: [
      { step: 1, title: 'Fleet Integration Mapping', description: 'Analyze vehicle route tracking protocols and dispatch APIs.' },
      { step: 2, title: 'Routing System Rollout', description: 'Configure spatial databases and vehicle dashboard overlays.' }
    ]
  },
  {
    title: 'Real Estate',
    slug: 'real-estate',
    category: 'PropTech',
    shortDescription: 'Dynamic property listing networks, tenant portal platforms, and online leasing.',
    fullDescription: 'Interactive real estate marketplace listings, automated background check integrations, digital document signing systems, and tenant maintenance request panels.',
    overview: 'Streamlining residential operations with secure transaction rails and automated lease generation.',
    icon: 'Boxes',
    coverImage: 'service_product_design',
    thumbnail: 'service_product_design',
    dashboardImage: 'overview_web_dev',
    displayOrder: 8,
    status: 'active',
    featured: false,
    features: ['Dynamic listing networks', 'Tenant maintenance request portals', 'Online document sign'],
    technologies: ['NextJS', 'NestJS', 'MongoDB', 'AWS S3'],
    benefits: ['Accelerated lease generation', 'Frictionless tenant support', 'Higher listing conversions'],
    ctaLabel: 'Automate PropTech Operations',
    stats: [
      { value: '48hr', label: 'Avg Lease Approval', iconType: 'calendar', colorTheme: 'purple' },
      { value: '95%', label: 'Digital Adoption', iconType: 'users', colorTheme: 'blue' }
    ],
    process: [
      { step: 1, title: 'PropTech Workflow Mapping', description: 'Analyze tenant verification steps and lease templates.' },
      { step: 2, title: 'Platform Development', description: 'Assemble secure marketplace listings and tenant dashboards.' }
    ]
  },
  {
    title: 'Travel',
    slug: 'travel',
    category: 'Hospitality',
    shortDescription: 'Custom booking engines, flight aggregator integrations, and client mobile apps.',
    fullDescription: 'Headless reservation engines, secure payment gateways, itinerary builders, and localized push notification triggers.',
    overview: 'Designing reservation channels with real-time room availability charts and rapid checkout.',
    icon: 'Rocket',
    coverImage: 'service_creative_design',
    thumbnail: 'service_creative_design',
    dashboardImage: 'ai_translator_batches',
    displayOrder: 9,
    status: 'active',
    featured: false,
    features: ['Custom booking engines', 'Real-time room grids', 'Itinerary builders'],
    technologies: ['Vue', 'Fastify', 'MongoDB', 'Redis'],
    benefits: ['Zero double-booking issues', 'Increased ancillary bookings', 'Optimized mobile checkouts'],
    ctaLabel: 'Launch Booking Platform',
    stats: [
      { value: '30k+', label: 'Reservations Made', iconType: 'briefcase', colorTheme: 'green' },
      { value: '100%', label: 'SLA Availability', iconType: 'globe', colorTheme: 'blue' }
    ],
    process: [
      { step: 1, title: 'Integration Blueprint', description: 'Review airline/hotel APIs and payment options.' },
      { step: 2, title: 'Engine Deployment', description: 'Build reservation pipelines and cache managers.' }
    ]
  },
  {
    title: 'Automobile',
    slug: 'automobile',
    category: 'Industrial',
    shortDescription: 'Connected car dashboards, dealership inventory networks, and parts catalogs.',
    fullDescription: 'Dealership inventory search matrices, interactive car configuration dashboards, connected vehicle telemetry panels, and automated vendor part request pipelines.',
    overview: 'Connecting car dealerships to national warehouses with searchable inventory matrices and custom configurations.',
    icon: 'Briefcase',
    coverImage: 'service_cloud',
    thumbnail: 'service_cloud',
    dashboardImage: 'portfolio_laptop_mockup',
    displayOrder: 10,
    status: 'active',
    featured: false,
    features: ['Dealership search matrices', 'Car configuration tools', 'Dealer part pipelines'],
    technologies: ['React', 'Koa', 'PostgreSQL', 'Redis'],
    benefits: ['Minimized delivery overhead', 'Higher vehicle configuration sales', 'Accurate stock levels'],
    ctaLabel: 'Digitalize Automotive Retail',
    stats: [
      { value: '450+', label: 'Dealers Connected', iconType: 'network', colorTheme: 'purple' },
      { value: '3s', label: 'Inventory Search Sync', iconType: 'clock', colorTheme: 'gold' }
    ],
    process: [
      { step: 1, title: 'Catalog Structuring', description: 'Analyze dealer schema fields and national inventory databases.' },
      { step: 2, title: 'Integration Rollout', description: 'Build car configuration modules and telemetry APIs.' }
    ]
  }
];

async function seed() {
  try {
    console.log('[Seed:Industries] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed:Industries] Connected successfully.');

    console.log('[Seed:Industries] Cleaning up existing Industries...');
    await Industry.deleteMany({});
    console.log('[Seed:Industries] Cleaned successfully.');

    console.log('[Seed:Industries] Inserting 10 industries...');
    await Industry.insertMany(INDUSTRIES_DATA);
    console.log('[Seed:Industries] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seed:Industries] Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed:Industries] Disconnected.');
  }
}

seed();
