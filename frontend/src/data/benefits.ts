import { Cpu, Shield, Users, ClipboardCheck, DollarSign, Layers } from 'lucide-react';

/** Benefits grid — mirrors “Key benefits” style landing pages */
export const SECTION_BENEFITS = {
  tag: 'Benefits',
  title: 'Why teams choose',
  highlight: 'technology-first growth',
  description:
    'Clear scope, disciplined engineering, marketing and ops alignment, and communication leadership can audit—so pipeline, efficiency, and delivery stay aligned from kickoff to handover.',
} as const;

export const BENEFITS = [
  {
    icon: Cpu,
    title: 'Engineering discipline',
    description:
      'Version control, environments that mirror production, and repeatable releases—so deploys are boring in the right way.',
  },
  {
    icon: Shield,
    title: 'Security & reliability',
    description:
      'Threat-aware design, sensible defaults, and testing matched to your risk profile, data sensitivity, and compliance needs.',
  },
  {
    icon: Users,
    title: 'Revenue alignment',
    description:
      'Shared truth on backlog, demos, funnel metrics, and documentation so sales, marketing, and product agree on what “done” means.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality & handover',
    description:
      'Test evidence, runbooks, and training so your internal team owns the system after go-live.',
  },
  {
    icon: DollarSign,
    title: 'Transparent commercial terms',
    description:
      'Effort-based or milestone billing with written assumptions—no surprise line items without prior approval.',
  },
  {
    icon: Layers,
    title: 'Full-stack continuity',
    description:
      'One partner for UI, APIs, data, automation, and docs reduces integration risk and speeds root-cause resolution.',
  },
] as const;
