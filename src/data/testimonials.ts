export const TESTIMONIALS = [
  {
    name: 'Surender G.',
    role: 'Founder',
    company: 'Early-stage product company',
    content:
      'TechVistar translated an ambiguous brief into a shippable mobile release. Written scope, demo cadence, and documentation made stakeholder alignment straightforward from sprint one to store submission.',
    rating: 5,
  },
  {
    name: 'Shailaja Swamy',
    role: 'Marketing lead',
    company: 'B2B services firm',
    content:
      'Our web rebuild and analytics instrumentation finally gave leadership a clear view of conversion paths. Communication was crisp, milestones landed on time, and handover did not leave us dependent on tacit knowledge.',
    rating: 5,
  },
  {
    name: 'Pavan Reddy',
    role: 'Graduate student',
    company: 'Engineering programme',
    content:
      'Structured support on my capstone—from problem statement through implementation and final report—meant I could defend the work with evidence, not slides alone.',
    rating: 5,
  },
  {
    name: 'Rajesh G.',
    role: 'Owner',
    company: 'Local services business',
    content:
      'A pragmatic site and enquiry funnel our front desk can update without calling a developer. Training and written handover matched what we were promised at kickoff.',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    role: 'Product manager',
    company: 'Health-tech SaaS',
    content:
      'They integrated with our existing backlog and release train instead of inventing a parallel process. API work, QA notes, and release checklists were audit-ready for our ISO prep.',
    rating: 5,
  },
  {
    name: 'Vikram S.',
    role: 'CTO',
    company: 'Logistics scale-up',
    content:
      'We needed a partner who could read our runbooks and improve them. Delivery included environment-specific deploy paths and rollback steps—not just “it works on my machine.”',
    rating: 5,
  },
  {
    name: 'Meera Iyer',
    role: 'Operations director',
    company: 'Professional services group',
    content:
      'Internal tooling for approvals and reporting replaced a fragile spreadsheet stack. Change requests were quoted before build, which kept finance and IT aligned.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Engineering lead',
    company: 'Fintech team',
    content:
      'Security expectations were taken seriously from day one: threat modeling notes, test evidence for critical paths, and sensible secrets handling. Rare in mid-size vendor engagements.',
    rating: 5,
  },
  {
    name: 'Deepa N.',
    role: 'Programme head',
    company: 'Ed-tech nonprofit',
    content:
      'Content workflows and a modest LMS integration shipped on the agreed date for our intake cycle. Their documentation made volunteer developers productive within a week.',
    rating: 5,
  },
  {
    name: 'Karthik M.',
    role: 'IT manager',
    company: 'Manufacturing SME',
    content:
      'Vendor onboarding and SSO were painful internally; TechVistar adapted to our IdP constraints and produced integration notes our infra team could sign off without rework.',
    rating: 5,
  },
] as const;

export const SECTION_TESTIMONIALS = {
  tag: 'Client references',
  title: 'What leaders and teams',
  highlight: 'say about delivery',
  description:
    'Post-engagement feedback from product, engineering, operations, and academic clients—focused on scope discipline, measurable outcomes, and handover quality. Identifiers summarized where confidentiality applies.',
  footnote:
    'Metrics are compiled from internal delivery records and structured post-engagement surveys; they are not aggregated from public review marketplaces.',
  clientVoicesLabel: 'Client voices',
  clientVoicesAnimatedLabel: 'Client voices — continuously updated',
  deliveryIndicatorsLabel: 'Delivery indicators',
} as const;

export const TESTIMONIAL_AGGREGATE = [
  { value: '98%', label: 'On-time milestone delivery' },
  { value: '60+', label: 'Completed engagements' },
  { value: '4.9/5', label: 'Post-project satisfaction' },
] as const;
