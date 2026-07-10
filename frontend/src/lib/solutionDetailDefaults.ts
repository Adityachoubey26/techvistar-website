/**
 * @file solutionDetailDefaults.ts
 * @description Default CMS values for Solution Detail pages — matches current public UI.
 */

import dashboardImg from '@/assets/portfolio_laptop_mockup.jpg';

export interface SolutionHeroFloatingCard {
  value: string;
  label: string;
  icon: string;
}

export interface SolutionHeroStat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface SolutionNavItem {
  id: string;
  label: string;
}

export interface SolutionSectionCopy {
  backLinkText: string;
  overviewTitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  techStackTitle: string;
  techStackSubtitle: string;
  navItems: SolutionNavItem[];
}

export const DEFAULT_HERO_FLOATING_CARDS: SolutionHeroFloatingCard[] = [
  { value: '99.9%', label: 'System Uptime', icon: 'Shield' },
  { value: '500+', label: 'Enterprise Clients', icon: 'Users' },
  { value: 'AI', label: 'AI Enabled', icon: 'Sparkles' },
  { value: 'Enterprise', label: 'Security', icon: 'Shield' },
];

export const DEFAULT_HERO_STATS: SolutionHeroStat[] = [
  {
    value: '40%',
    label: 'Efficiency Gain',
    description: 'Improve operational efficiency across your organization',
    icon: 'TrendingUp',
  },
  {
    value: '99.9%',
    label: 'System Uptime',
    description: 'Enterprise-grade reliability and performance',
    icon: 'Shield',
  },
  {
    value: '500+',
    label: 'Projects Delivered',
    description: 'Successfully delivered enterprise solutions worldwide',
    icon: 'Users',
  },
  {
    value: '24/7',
    label: 'Expert Support',
    description: 'Round-the-clock support from our expert team',
    icon: 'Headphones',
  },
];

export const DEFAULT_SECTION_COPY: SolutionSectionCopy = {
  backLinkText: 'Back to all solutions',
  overviewTitle: 'Overview',
  featuresTitle: 'Features',
  featuresSubtitle: 'Key capabilities of our solution',
  processTitle: 'How It Works',
  processSubtitle: 'Step-by-step execution strategy',
  benefitsTitle: 'Business Benefits',
  benefitsSubtitle: 'Measurable impact and value',
  techStackTitle: 'Technology Stack',
  techStackSubtitle: 'Our core execution stacks and tools mapped to this service dynamic:',
  navItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'process', label: 'Process' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'tech-stack', label: 'Tech Stack' },
  ],
};

export const DEFAULT_DASHBOARD_IMAGE = dashboardImg;

export function buildDefaultHeroDescription(title: string): string {
  return `Empower your organization with scalable, secure, and intuitive ${title.toLowerCase()} systems. We build customized architectures that seamlessly integrate with your existing workflows, bridging the gap between legacy processes and modern innovation to drive measurable growth.`;
}

export function mergeSectionCopy(
  partial?: Partial<SolutionSectionCopy> | null
): SolutionSectionCopy {
  if (!partial) return { ...DEFAULT_SECTION_COPY, navItems: [...DEFAULT_SECTION_COPY.navItems] };
  return {
    ...DEFAULT_SECTION_COPY,
    ...partial,
    navItems:
      partial.navItems && partial.navItems.length > 0
        ? partial.navItems
        : [...DEFAULT_SECTION_COPY.navItems],
  };
}

export function mergeHeroFloatingCards(
  cards?: SolutionHeroFloatingCard[] | null
): SolutionHeroFloatingCard[] {
  if (cards && cards.length > 0) return cards;
  return DEFAULT_HERO_FLOATING_CARDS.map((c) => ({ ...c }));
}

export function mergeHeroStats(stats?: SolutionHeroStat[] | null): SolutionHeroStat[] {
  if (stats && stats.length > 0) return stats;
  return DEFAULT_HERO_STATS.map((s) => ({ ...s }));
}
