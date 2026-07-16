const SCROLL_DURATION_MS = 820;
const HIGHLIGHT_MS = 1600;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Sticky navbar + optional announcement bar clearance. */
export function getStickyNavOffset(): number {
  const announcement = document.querySelector<HTMLElement>('[data-announcement-bar]');
  const announcementH = announcement?.offsetHeight ?? 0;
  const navH = window.matchMedia('(min-width: 768px)').matches ? 80 : 56;
  return announcementH + navH + 12;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function smoothScrollToY(targetY: number, duration = SCROLL_DURATION_MS): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const delta = targetY - startY;

    if (Math.abs(delta) < 2 || prefersReducedMotion()) {
      window.scrollTo(0, targetY);
      resolve();
      return;
    }

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + delta * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export function extractSectionHash(href: string): 'contact' | 'services' | null {
  const raw = href.trim().toLowerCase();
  if (!raw) return null;
  if (raw.includes('#contact')) return 'contact';
  if (raw.includes('#services')) return 'services';
  return null;
}

/** Infer section from CTA copy when CMS links are ambiguous. */
export function inferSectionFromLabel(label: string): 'contact' | 'services' | null {
  const text = label.trim().toLowerCase();
  if (!text) return null;
  if (
    text.includes('contact') ||
    text.includes('get in touch') ||
    text.includes('talk') ||
    text.includes('expert') ||
    text.includes('consult')
  ) {
    return 'contact';
  }
  if (text.includes('service') || text.includes('explore') || text.includes('view')) {
    return 'services';
  }
  return null;
}

export function resolveHeroSection(
  label: string,
  href: string,
  preferred?: 'contact' | 'services',
): 'contact' | 'services' | null {
  return preferred ?? extractSectionHash(href) ?? inferSectionFromLabel(label);
}

function focusContactForm(): void {
  const section = document.getElementById('contact');
  if (!section) return;

  const focusTarget =
    section.querySelector<HTMLElement>('input[name="name"]') ??
    section.querySelector<HTMLElement>('form input, form textarea, form button');

  if (!focusTarget) return;

  try {
    focusTarget.focus({ preventScroll: true });
  } catch {
    focusTarget.focus();
  }
}

function highlightServicesHeading(): void {
  const heading = document.getElementById('services-heading');
  if (!heading) return;

  heading.classList.add('hero-target-highlight');
  window.setTimeout(() => {
    heading.classList.remove('hero-target-highlight');
  }, HIGHLIGHT_MS);
}

export async function scrollToHomeSection(
  section: 'contact' | 'services',
  options?: { focusForm?: boolean; highlightHeading?: boolean },
): Promise<void> {
  const el = document.getElementById(section);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - getStickyNavOffset();
  await smoothScrollToY(Math.max(0, top));

  if (section === 'contact' && options?.focusForm !== false) {
    // Wait a beat so scroll settles before focusing.
    window.setTimeout(focusContactForm, 60);
  }

  if (section === 'services' && options?.highlightHeading !== false) {
    highlightServicesHeading();
  }
}

export function isHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '';
}
