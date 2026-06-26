import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_COPY } from '@/data/hero';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const spring = { type: 'spring' as const, stiffness: 420, damping: 36, mass: 0.8 };

const springSmooth = { stiffness: 120, damping: 22, mass: 0.6 };

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

/** 3D “lift in” from depth */
const rise3d: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 28,
    y: 48,
    z: -80,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    z: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 26,
      mass: 0.85,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, z: -30 },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    transition: spring,
  },
};

/** Typewriter-style reveal for the accent word; reserves width to avoid layout shift */
function TypingAccent({
  text,
  reduced,
  delayMs,
  charMs = 72,
  className,
}: {
  text: string;
  reduced: boolean;
  delayMs: number;
  charMs?: number;
  className?: string;
}) {
  const [len, setLen] = useState(reduced ? text.length : 0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) {
      setLen(text.length);
      return;
    }
    setLen(0);
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setLen(Math.min(i, text.length));
        if (i >= text.length && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, charMs);
    }, delayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, reduced, delayMs, charMs]);

  const visible = text.slice(0, len);
  const done = len >= text.length;

  return (
    <span className={`relative inline-block align-baseline ${className ?? ''}`}>
      <span aria-hidden className="invisible whitespace-pre">
        {text}
      </span>
      <span className="absolute left-0 top-0 whitespace-pre" aria-hidden>
        {visible}
        {!done && (
          <span
            className="ml-px inline-block h-[0.85em] w-[2px] translate-y-px bg-emerald-400/90 align-middle animate-pulse"
            aria-hidden
          />
        )}
      </span>
    </span>
  );
}

type HeroSectionProps = {
  /** Extra top padding when the homepage announcement marquee is shown under the navbar */
  showAnnouncementBar?: boolean;
};

export const HeroSection = ({ showAnnouncementBar = false }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [9, -9]),
    springSmooth
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-11, 11]),
    springSmooth
  );

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [18, -18]), springSmooth);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springSmooth);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], [0, 36]);
  const scrollTilt = useTransform(scrollYProgress, [0, 0.4], [0, -6]);

  const glowScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.12]), { stiffness: 80, damping: 35 });
  const glowRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const ringParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springSmooth);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const reduceMotion = prefersReducedMotion === true;
  const heroHeadlineLabel = `${HERO_COPY.headlineLine1} ${HERO_COPY.headlineAccent} ${HERO_COPY.headlineLine2}`;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950 selection:bg-primary/30 [perspective:1400px]"
    >
      {/* Continuous moving background — soft blobs + drifting grid + light sweep */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-[25%] top-[5%] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-emerald-500/[0.14] blur-[min(88px,15vw)] motion-reduce:animate-none animate-hero-blob-1 will-change-transform"
        />
        <div
          className="absolute left-[35%] -top-[20%] h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-full bg-teal-500/[0.09] blur-[min(96px,14vw)] motion-reduce:animate-none animate-hero-blob-2 will-change-transform"
        />
        <div
          className="absolute -right-[20%] bottom-0 h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-emerald-400/[0.08] blur-[min(100px,16vw)] motion-reduce:animate-none animate-hero-blob-3 will-change-transform"
        />
        <div
          className="absolute inset-0 opacity-[0.4] motion-reduce:animate-none animate-hero-grid-drift [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-[20%] top-0 h-full w-[55%] max-w-xl bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-2xl motion-reduce:animate-none animate-hero-shimmer will-change-transform" />
        </div>
      </div>

      {/* Single large circle — slow path across the entire hero (above blob layer, behind stars) */}
      <div
        className="pointer-events-none absolute inset-0 -z-[11] overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute left-0 top-0 h-[min(92vmin,680px)] w-[min(92vmin,680px)] rounded-full bg-gradient-to-br from-emerald-400/25 via-primary/20 to-teal-600/15 blur-[min(100px,14vw)] motion-reduce:animate-none animate-hero-circle-orbit will-change-transform"
        />
      </div>

      {/* Starfield — parallax + slow continuous drift */}
      <motion.div
        style={{ x: prefersReducedMotion ? 0 : parallaxX, y: prefersReducedMotion ? 0 : parallaxY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:32px_32px] motion-reduce:animate-none animate-hero-starfield-drift will-change-transform"
        aria-hidden
      />

      {/* Glow — depth layer + scroll scale + float */}
      <motion.div
        style={{
          scale: glowScale,
          rotateX: prefersReducedMotion ? 0 : glowRotateX,
        }}
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[min(120vw,720px)] w-[min(120vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.18] blur-[120px] will-change-transform"
        aria-hidden
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -12, 0],
                opacity: [0.45, 0.62, 0.45],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ x: prefersReducedMotion ? 0 : ringParallaxX }}
        className="pointer-events-none absolute left-1/2 top-[40%] -z-10 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.05] blur-[1px] will-change-transform"
        aria-hidden
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className={cn(
          'container-custom relative z-10 flex min-h-[100svh] flex-col justify-center px-4 pb-20 sm:px-6 md:pb-24 lg:px-8',
          showAnnouncementBar ? 'pt-[9.75rem] md:pt-[10.5rem]' : 'pt-[7.5rem] md:pt-28'
        )}
      >
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            rotateZ: prefersReducedMotion ? 0 : scrollTilt,
            transformStyle: 'preserve-3d',
          }}
          className="mx-auto w-full max-w-4xl text-center will-change-transform"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h1
              variants={rise3d}
              style={{ transformStyle: 'preserve-3d' }}
              className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white [transform-style:preserve-3d]"
              aria-label={heroHeadlineLabel}
            >
              <span aria-hidden className="block">
                <motion.span
                  className="block sm:whitespace-nowrap"
                  style={{ display: 'block', transform: 'translateZ(24px)' }}
                >
                  {HERO_COPY.headlineLine1}{' '}
                  <TypingAccent
                    text={HERO_COPY.headlineAccent}
                    reduced={reduceMotion}
                    delayMs={780}
                    className="text-emerald-400 drop-shadow-[0_4px_24px_rgba(52,211,153,0.35)]"
                  />
                </motion.span>
                <motion.span
                  className="mt-1 block text-white sm:mt-2"
                  style={{ display: 'block', transform: 'translateZ(12px)' }}
                >
                  {HERO_COPY.headlineLine2}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{ transform: 'translateZ(8px)' }}
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-10 sm:text-lg"
            >
              {HERO_COPY.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ transform: 'translateZ(20px)' }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
            >
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.04, z: 30, transition: { type: 'spring', stiffness: 400, damping: 20 } }
                }
                whileTap={{ scale: 0.97 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Button
                  size="lg"
                  className="h-12 min-w-[11.5rem] rounded-lg border-0 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_12px_40px_-12px_rgba(34,197,94,0.45)] transition-shadow hover:bg-primary/92 hover:shadow-[0_16px_48px_-10px_rgba(34,197,94,0.4)]"
                  asChild
                >
                  <Link to="/#contact" className="group inline-flex items-center justify-center gap-2">
                    {HERO_COPY.ctaPrimary}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.03, z: 20, y: -2 }
                }
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[11.5rem] rounded-lg border-white/15 bg-zinc-950/60 px-8 text-base font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/5"
                  asChild
                >
                  <Link to="/#services">{HERO_COPY.ctaSecondary}</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{ transform: 'translateZ(4px)' }}
              className="mt-14 text-xs font-medium tracking-[0.12em] text-zinc-600 sm:mt-16"
            >
              {HERO_COPY.locationLine}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
