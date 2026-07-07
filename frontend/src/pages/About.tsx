import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ABOUT_COPY, ABOUT_PAGE } from '@/data';
import aboutBg from '../assets/about-bg.png';
import CircularText from '@/components/ui/CircularText';
import logoImg from '@/assets/logo.webp';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.42, ease },
};

const pillars = [
  {
    icon: Target,
    label: ABOUT_COPY.mission.title,
    text: ABOUT_COPY.mission.text,
    bg: 'bg-emerald-50/30 hover:bg-emerald-50/60',
    border: 'border-emerald-100/80 hover:border-emerald-200',
    iconBg: 'bg-emerald-100/60 text-emerald-700',
  },
  {
    icon: Eye,
    label: ABOUT_COPY.vision.title,
    text: ABOUT_COPY.vision.text,
    bg: 'bg-blue-50/30 hover:bg-blue-50/60',
    border: 'border-blue-100/80 hover:border-blue-200',
    iconBg: 'bg-blue-100/60 text-blue-700',
  },
] as const;

const boxStyles = [
  {
    icon: Smartphone,
    bg: 'bg-blue-50/40 hover:bg-blue-50/70',
    border: 'border-blue-100/80 hover:border-blue-200',
    iconBg: 'bg-blue-100/60 text-blue-600',
  },
  {
    icon: TrendingUp,
    bg: 'bg-emerald-50/40 hover:bg-emerald-50/70',
    border: 'border-emerald-100/80 hover:border-emerald-200',
    iconBg: 'bg-emerald-100/60 text-emerald-600',
  },
  {
    icon: Globe,
    bg: 'bg-violet-50/40 hover:bg-violet-50/70',
    border: 'border-violet-100/80 hover:border-violet-200',
    iconBg: 'bg-violet-100/60 text-violet-600',
  },
  {
    icon: Zap,
    bg: 'bg-amber-50/40 hover:bg-amber-50/70',
    border: 'border-amber-100/80 hover:border-amber-200',
    iconBg: 'bg-amber-100/60 text-amber-600',
  },
  {
    icon: Sparkles,
    bg: 'bg-cyan-50/40 hover:bg-cyan-50/70',
    border: 'border-cyan-100/80 hover:border-cyan-200',
    iconBg: 'bg-cyan-100/60 text-cyan-600',
  },
  {
    icon: GraduationCap,
    bg: 'bg-rose-50/40 hover:bg-rose-50/70',
    border: 'border-rose-100/80 hover:border-rose-200',
    iconBg: 'bg-rose-100/60 text-rose-600',
  },
] as const;

const sectionPad = 'px-5 py-6 sm:px-6 sm:py-7 md:px-8';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Text Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: 64, transition: { duration: 0.6, ease, delay: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-muted">
      <Navbar />

      {/* Page Hero with Custom Background & Animations */}
      <section 
        className="relative overflow-hidden bg-zinc-950 mt-12 sm:mt-14 md:mt-16 lg:mt-[4.25rem] pt-10 pb-10 md:pt-12 md:pb-12 border-b border-zinc-900"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-85 pointer-events-none"
          style={{ 
            backgroundImage: `url(${aboutBg})`,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent z-0 pointer-events-none" />

        {/* Tiny Floating Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-emerald-400/80 rounded-full blur-[0.5px]"
              style={{
                left: `${(i * 14) % 100}%`,
                top: `${(i * 23) % 100}%`,
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, 8, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 10 + (i % 3) * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Side: Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 text-left"
            >
              <motion.span 
                variants={itemVariants}
                className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20"
              >
                {ABOUT_PAGE.hero.eyebrow}
              </motion.span>

              <motion.h1 
                variants={itemVariants}
                className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                About <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">TechVistar</span>
              </motion.h1>

              <motion.div 
                variants={lineVariants}
                className="mt-4 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" 
              />

              <motion.p 
                variants={itemVariants}
                className="mt-4 text-sm sm:text-[0.9375rem] md:text-base leading-relaxed text-zinc-300 max-w-xl"
              >
                {ABOUT_PAGE.hero.lead}
              </motion.p>
            </motion.div>

            {/* Right Side: Interactive Animated Globe */}
            <div className="lg:col-span-5 hidden md:flex relative items-center justify-center h-[150px] lg:h-[180px]">
              {/* Soft radial glow under the globe */}
              <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 blur-[35px] pointer-events-none" />

              {/* Parallax Group (Globe + Orbits) */}
              <motion.div
                style={{
                  x: mousePosition.x * 12,
                  y: mousePosition.y * 12,
                }}
                className="relative w-28 h-28 lg:w-34 lg:h-34 rounded-full border border-emerald-500/20 bg-emerald-500/[0.01] flex items-center justify-center pointer-events-none opacity-40"
                animate={{
                  boxShadow: [
                    '0 0 35px rgba(16,185,129,0.04)',
                    '0 0 55px rgba(16,185,129,0.08)',
                    '0 0 35px rgba(16,185,129,0.04)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Orbital lines & particles */}
                <motion.div 
                  className="absolute inset-2 rounded-full border border-teal-500/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_8px_#14b8a6]" />
                </motion.div>

                <motion.div 
                  className="absolute inset-8 rounded-full border border-emerald-500/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

            {/* Single structured document — tight vertical rhythm */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_-12px_rgba(15,23,42,0.1)]">
          <motion.section {...fadeUp} className={`${sectionPad} border-b border-slate-100 bg-gradient-to-br from-primary/[0.02] via-emerald-50/[0.05] to-transparent`} aria-labelledby="overview-heading">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 id="overview-heading" className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {ABOUT_PAGE.overview.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">
                  {ABOUT_PAGE.overview.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative flex items-center justify-center w-[160px] h-auto p-4 rounded-xl border-2 border-emerald-500/10 bg-white/50 shadow-lg backdrop-blur-sm">
                  <img 
                    src={logoImg} 
                    alt="TechVistar Logo" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Focus areas */}
          <section className={`${sectionPad} border-b border-slate-100 bg-slate-50/40`} aria-labelledby="focus-heading">
            <motion.div {...fadeUp}>
              <h2 id="focus-heading" className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {ABOUT_PAGE.focusAreasHeading}
              </h2>
              <p className="mt-2 text-sm leading-snug text-slate-600">
                {ABOUT_PAGE.focusAreasDescription}
              </p>
            </motion.div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {ABOUT_PAGE.focusAreas.map((area, i) => {
                const styles = boxStyles[i % boxStyles.length];
                const Icon = styles.icon;
                return (
                  <motion.div
                    key={area.title}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`rounded-xl border-2 p-4 shadow-sm transition-all duration-300 hover:shadow-md ${styles.bg} ${styles.border}`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.iconBg} ring-1 ring-black/5`}>
                      <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="mt-3 font-display text-[0.9375rem] font-semibold leading-snug text-slate-900">{area.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{area.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Mission & vision */}
          <section className={`${sectionPad} border-b border-slate-100`} aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {ABOUT_PAGE.missionVisionHeading}
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 md:gap-4">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className={`overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-md ${pillar.bg} ${pillar.border}`}
                >
                  <div className="h-0.5 w-full bg-gradient-to-r from-primary via-emerald-500 to-teal-600" aria-hidden />
                  <div className="p-4 sm:p-5">
                    <div className="flex gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-black/5 ${pillar.iconBg}`}>
                        <pillar.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </div>
                      <h3 className="min-w-0 flex-1 pt-0.5 font-display text-[0.9375rem] font-bold leading-snug text-slate-900">
                        {pillar.label}
                      </h3>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{pillar.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Operating principles */}
          <motion.section {...fadeUp} className={`${sectionPad} border-b border-slate-100 bg-slate-50/40`} aria-labelledby="principles-heading">
            <h2 id="principles-heading" className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {ABOUT_PAGE.principlesHeading}
            </h2>
            <p className="mt-2 text-sm leading-snug text-slate-600">{ABOUT_PAGE.principlesIntro}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 border-t border-slate-200/80 pt-4">
              {ABOUT_PAGE.principles.map((line, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.015, y: -1 }}
                  className="flex gap-3 p-4 rounded-xl border-2 border-emerald-500/10 bg-emerald-500/[0.01] hover:bg-emerald-500/[0.04] hover:border-emerald-500/20 transition-all duration-200"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Check className="h-3 w-3 stroke-[2.5]" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-snug">{line}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Location + commitment + CTA — one block */}
          {/* Location + commitment + CTA — grid block */}
          <section className={`${sectionPad} bg-gradient-to-br from-primary/[0.03] via-emerald-50/10 to-transparent`} aria-labelledby="location-heading">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Headquarters Card */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.995 }}
                className="flex gap-4 p-5 rounded-2xl border-2 border-emerald-500/20 bg-white/80 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.2)]">
                  <Building2 className="h-6 w-6 animate-pulse" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-800/10">
                    {ABOUT_PAGE.location.heading}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold tracking-tight text-slate-900">{ABOUT_COPY.locationLine}</h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{ABOUT_PAGE.location.detail}</p>
                </div>
              </motion.div>

              {/* Commitment Card */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.995 }}
                className="flex gap-4 p-5 rounded-2xl border-2 border-teal-500/20 bg-white/80 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-[0_4px_12px_-2px_rgba(20,184,166,0.2)]">
                  <Sparkles className="h-6 w-6 animate-pulse" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-teal-800 ring-1 ring-teal-800/10">
                    {ABOUT_PAGE.commitmentHeading}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-slate-800 leading-relaxed">{ABOUT_COPY.closing}</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Banner */}
            <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xs font-bold leading-snug sm:max-w-[70%] sm:text-sm tracking-wide">
                {ABOUT_PAGE.ctaText}
              </p>
              <Button variant="secondary" size="default" className="shrink-0 border-0 bg-white text-emerald-700 hover:bg-slate-50 hover:text-emerald-800 font-bold text-xs px-5 py-2.5 shadow-sm transition-all" asChild>
                <Link to="/#contact" className="inline-flex items-center gap-2 uppercase tracking-wider">
                  {ABOUT_PAGE.ctaButtonText}
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" aria-hidden />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default About;
