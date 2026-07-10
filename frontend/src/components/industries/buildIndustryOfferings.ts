import { Industry } from '@/data/industries';
import { DetailedOffering } from '@/data/services';

const OFFERING_COLORS = ['green', 'blue', 'purple', 'orange', 'indigo', 'red'] as const;
const VALID_COLORS = new Set<string>(OFFERING_COLORS);

const COLOR_ALIASES: Record<string, string> = {
  emerald: 'green',
  teal: 'green',
  gold: 'orange',
  amber: 'orange',
  gray: 'indigo',
  grey: 'indigo',
  slate: 'indigo',
  cyan: 'blue',
  sky: 'blue',
  violet: 'purple',
  rose: 'red',
  pink: 'red',
};

const OFFERING_ICONS = [
  'sparkles',
  'shield',
  'layers',
  'target',
  'code',
  'brain',
  'globe',
  'database',
  'cloud',
  'cpu',
] as const;

const ICON_ALIASES: Record<string, string> = {
  rocket: 'sparkles',
  star: 'sparkles',
  workflow: 'repeat',
  zap: 'sparkles',
  server: 'database',
  boxes: 'layers',
  briefcase: 'target',
  pentool: 'pentool',
  megaphone: 'megaphone',
  terminal: 'terminal',
  message: 'message',
  bot: 'bot',
  usercheck: 'usercheck',
  wrench: 'wrench',
  search: 'search',
  layout: 'layout',
  filetext: 'filetext',
  checkcircle: 'checkcircle',
  layouttemplate: 'layouttemplate',
  network: 'network',
  filesearch: 'filesearch',
};

function normalizeColor(color: string | undefined, index: number): string {
  const key = (color || '').toLowerCase().trim();
  const mapped = COLOR_ALIASES[key] || key;
  if (VALID_COLORS.has(mapped)) return mapped;
  return OFFERING_COLORS[index % OFFERING_COLORS.length];
}

function normalizeIconName(iconName: string | undefined, index: number): string {
  const key = (iconName || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  if (!key) return OFFERING_ICONS[index % OFFERING_ICONS.length];
  return ICON_ALIASES[key] || (OFFERING_ICONS.includes(key as (typeof OFFERING_ICONS)[number]) ? key : OFFERING_ICONS[index % OFFERING_ICONS.length]);
}

function normalizeOffering(
  item: { title: string; description: string; badges?: string[]; color?: string; iconName?: string },
  index: number,
  techBadges: string[]
): DetailedOffering {
  return {
    title: item.title,
    description: item.description,
    badges: item.badges?.length ? item.badges : techBadges.slice(0, 3),
    color: normalizeColor(item.color, index),
    iconName: normalizeIconName(item.iconName, index),
  };
}

/** Builds premium offering cards for SolutionsSection from industry CMS fields. */
export function buildIndustryDetailedOfferings(industry: Industry): DetailedOffering[] {
  const techBadges = industry.technologies.filter(Boolean);

  if (industry.detailedOfferings?.length) {
    return industry.detailedOfferings.map((offering, index) =>
      normalizeOffering(offering, index, techBadges)
    );
  }

  if (industry.solutions.length > 0) {
    return industry.solutions.map((solution, index) =>
      normalizeOffering(solution, index, techBadges)
    );
  }

  if (industry.challenges.length > 0) {
    return industry.challenges.map((challenge, index) =>
      normalizeOffering(challenge, index, techBadges)
    );
  }

  const offeringTitles = industry.offerings?.filter(Boolean) ?? [];
  if (offeringTitles.length > 0) {
    return offeringTitles.map((title, index) =>
      normalizeOffering(
        {
          title,
          description: industry.shortDescription || '',
        },
        index,
        techBadges
      )
    );
  }

  return [];
}
