// Navigation — About is a dedicated route; other anchors target home sections via /#…
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Homepage announcement ticker (shown below navbar) */
export const INTERNSHIP_MARQUEE_SEGMENTS = [
  'New batch open — 3-Month AI & Python Program',
  'Limited seats — register now',
  '1 hour daily training · Guest lectures · Certificate · Real-time projects',
  'Call +91 9573157982 · techvistar.com',
] as const;

export const HERO_COPY = {
  /** Line 1 + accent word + line 2 — Voxvertex-style two-line headline */
  headlineLine1: 'Technology-first',
  headlineAccent: 'Growth',
  headlineLine2: 'Without the chaos',
  tagline:
    'TechVistar helps businesses scale with integrated web systems, brand and digital presence, automation, and applied AI—structured from scope to sign-off, with outcomes you can measure and teams can run.',
  ctaPrimary: 'Get in touch',
  ctaSecondary: 'View services',
  locationLine: 'Hyderabad · Remote worldwide',
} as const;
