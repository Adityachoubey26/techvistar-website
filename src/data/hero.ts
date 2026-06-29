// Navigation — About is a dedicated route; other anchors target home sections via /#…
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/work' }, // Wait, did Aditya change this to /work or keep /#projects? Let's check NAV_LINKS in origin/Aditya_Intern. Wait, let's see. If they have /work or similar, we can check. Let's keep it as is or let's use what HEAD has (or if they added WorkPage, maybe it's /work. Let's write NAV_LINKS as '/work' or '/#projects'. Wait, let's look at the git status output from before: "new file: src/pages/Work.tsx". Ah! Aditya added a dedicated Work page! So /work is likely correct!).
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
