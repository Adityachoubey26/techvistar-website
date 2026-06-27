/** Service catalog — productized offers; aligned with JSON-LD OfferCatalog */
import {
  Layers,
  Globe,
  TrendingUp,
  Cpu,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const SERVICES = [
  {
    icon: Layers,
    title: 'Growth Stack Blueprint',
    description:
      'End-to-end product foundations: web and mobile applications, APIs, and integrations—scoped as one coherent system so marketing, sales, and ops see the same data and release cadence.',
    deliverables: ['Roadmap & milestone plan', 'Web / mobile / API delivery', 'Environments & release discipline', 'Acceptance & sign-off'],
  },
  {
    icon: Globe,
    title: 'Revenue Web Engine',
    description:
      'High-trust websites and conversion paths with analytics and goal design—so leadership sees demand, conversion, and channel truth, not vanity metrics.',
    deliverables: ['UX & performance baseline', 'Measurement plan & events', 'CRM / form integrations', 'SEO & content structure'],
  },
  {
    icon: TrendingUp,
    title: 'Brand & Growth Flywheel',
    description:
      'Positioning, content, and campaigns wired to pipeline and reporting—consistent creative, measurable experiments, and clear ownership between marketing and sales.',
    deliverables: ['Messaging & asset system', 'Organic & paid programs', 'Funnel & attribution hygiene', 'Reporting cadence'],
  },
  {
    icon: Cpu,
    title: 'Automate & Integrate',
    description:
      'Connect CRM, ops tools, and data flows; replace fragile spreadsheets with observable workflows, alerts, and audit-friendly handoffs between teams.',
    deliverables: ['Integration map & APIs', 'Workflow automation', 'Error handling & monitoring', 'Runbooks for operators'],
  },
  {
    icon: Sparkles,
    title: 'Applied AI & Decision Support',
    description:
      'Practical AI features—classification, assistants, retrieval—deployed with evaluation, guardrails, and governance suited to your data sensitivity and brand risk.',
    deliverables: ['Use-case & success metrics', 'Model / RAG architecture', 'Safety & evaluation harness', 'Rollout & owner training'],
  },
  {
    icon: BookOpen,
    title: 'Documentation & Research Desk',
    description:
      'SRS, architecture notes, API docs, and runbooks alongside the build; plus structured academic and research-adjacent support with reproducible artefacts where applicable.',
    deliverables: ['SRS & ADRs', 'API & ops documentation', 'Academic / capstone support', 'Submission-ready packaging'],
  },
] as const;

export const SECTION_SERVICES = {
  tag: 'Our services',
  title: 'Productized growth',
  highlight: 'you can scope and measure',
  description:
    'Six offers—from full-stack delivery to automation and applied AI—each with defined outcomes, written assumptions, and handover your team can run. Combine them or start where risk and ROI are highest.',
  cta: 'Request a scoped proposal or SOW discussion',
} as const;
