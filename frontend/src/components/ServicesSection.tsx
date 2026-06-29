import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SECTION_SERVICES, SERVICES } from "@/data";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/** Card shell: rises in with staggered grid timing */
const cardShellVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.05, ease },
  }),
};

/** Inner column: headline → copy → deliverables */
const contentStagger = {
  hidden: {},
  visible: (i: number) => ({
    transition: {
      staggerChildren: 0.072,
      delayChildren: 0.14 + i * 0.045,
    },
  }),
};

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease, delay: 0.2 },
  },
};

export const ServicesSection = () => {
  const { ref, isInView } = useAnimatedSection();

  return (
    <SiteSection ref={ref} id="services" variant="muted" aria-labelledby="services-heading">
      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_SERVICES.tag}
          title={SECTION_SERVICES.title}
          highlight={SECTION_SERVICES.highlight}
          description={SECTION_SERVICES.description}
          isInView={isInView}
          headingId="services-heading"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              custom={index}
              variants={cardShellVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -5, transition: { duration: 0.32, ease } }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] will-change-transform"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-500 to-teal-600" aria-hidden />

              <Link to={`/services/${service.slug}`} className="flex flex-1 flex-col h-full">
                <motion.div
                  className="flex flex-1 flex-col p-6 sm:p-7"
                  custom={index}
                  variants={contentStagger}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <motion.div variants={rowVariants} className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/5 text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-[1.04]"
                      aria-hidden
                    >
                      <service.icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </motion.div>

                  <motion.p variants={rowVariants} className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                    {service.description}
                  </motion.p>

                  <motion.div variants={rowVariants} className="mt-6">
                    <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Typical deliverables
                    </p>
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-b from-slate-50/95 to-white p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95)]">
                      <ul className="space-y-2.5" role="list">
                        {service.offerings.map((item) => (
                          <li key={item} className="flex gap-3 text-[0.8125rem] leading-snug text-slate-700">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                              <Check className="h-3 w-3 stroke-[2.5]" aria-hidden />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>

              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-950/[0.04] transition-[box-shadow] duration-300 group-hover:shadow-[0_12px_40px_-16px_rgba(22,163,74,0.18)] group-hover:ring-primary/15"
                aria-hidden
              />
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] sm:flex-row sm:px-8"
        >
          <span className="max-w-xl text-center text-sm leading-relaxed text-slate-600 sm:text-left">{SECTION_SERVICES.cta}</span>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/92"
          >
            Contact us
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </SiteSection>
  );
};
