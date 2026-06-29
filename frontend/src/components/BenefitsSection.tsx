import { motion } from 'framer-motion';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BENEFITS, SECTION_BENEFITS } from '@/data';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease },
  },
};

export const BenefitsSection = () => {
  const { ref, isInView } = useAnimatedSection();

  return (
    <SiteSection ref={ref} id="benefits" variant="muted" aria-labelledby="benefits-heading">
      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_BENEFITS.tag}
          title={SECTION_BENEFITS.title}
          highlight={SECTION_BENEFITS.highlight}
          description={SECTION_BENEFITS.description}
          isInView={isInView}
          headingId="benefits-heading"
        />

        <motion.div
          className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={gridContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {BENEFITS.map((item, index) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.32, ease } }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] will-change-transform"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-500 to-teal-600" aria-hidden />

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/5 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-[1.03]"
                      aria-hidden
                    >
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[1.0625rem] font-bold leading-snug tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <span className="shrink-0 font-mono text-[0.6875rem] font-medium tabular-nums tracking-wide text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">{item.description}</p>
              </div>

              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-950/[0.04] transition-[box-shadow] duration-300 group-hover:shadow-[0_12px_40px_-16px_rgba(22,163,74,0.12)] group-hover:ring-primary/12"
                aria-hidden
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SiteSection>
  );
};
