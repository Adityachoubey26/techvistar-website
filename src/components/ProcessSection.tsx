import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  PROCESS_PILLARS,
  PROCESS_STEPS,
  SECTION_PROCESS,
} from "@/data";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export const ProcessSection = () => {
  const { ref, isInView } = useAnimatedSection();

  return (
    <SiteSection ref={ref} id="process" variant="default" aria-labelledby="process-heading">
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[100px]"
        aria-hidden
      />

      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_PROCESS.tag}
          title={SECTION_PROCESS.title}
          highlight={SECTION_PROCESS.highlight}
          description={SECTION_PROCESS.description}
          isInView={isInView}
          headingId="process-heading"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08, ease }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <p className="mb-4 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Operating principles
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-slate-200/90 bg-slate-50/50 px-4 py-4 sm:flex-nowrap sm:gap-x-0 sm:divide-x sm:divide-slate-200/90 sm:px-0"
            aria-label="Operating principles for delivery"
          >
            {PROCESS_PILLARS.map((word) => (
              <li
                key={word}
                className="text-center sm:px-10"
              >
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-slate-700">
                  {word}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={listContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_12px_48px_-22px_rgba(15,23,42,0.12)]"
        >
          <div className="flex flex-col divide-y divide-slate-200/90 lg:flex-row lg:divide-x lg:divide-y-0">
            {PROCESS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.step}
                  variants={itemVariants}
                  className="group relative flex min-h-0 min-w-0 flex-1 flex-col transition-colors duration-300 lg:hover:bg-slate-50/60"
                >
                  <div
                    className="h-1 w-full shrink-0 bg-gradient-to-r from-primary via-emerald-500 to-teal-600"
                    aria-hidden
                  />

                  <div className="flex flex-1 flex-col bg-gradient-to-b from-white to-slate-50/40 px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6 lg:min-h-[280px]">
                    <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/5 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-[1.03]"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                          Step {item.step}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-bold leading-snug tracking-tight text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">{item.description}</p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                      {item.deliverables.map((line) => (
                        <li key={line} className="flex gap-2.5 text-sm leading-snug text-slate-700">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            strokeWidth={2.25}
                            aria-hidden
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-600"
        >
          The same phases apply whether discovery is a focused workshop or a full audit, and whether build is one squad or
          several—governance, documentation, and sign-off stay consistent throughout.
        </motion.p>
      </div>
    </SiteSection>
  );
};
