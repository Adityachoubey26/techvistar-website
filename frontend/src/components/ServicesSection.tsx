import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getActiveServices } from '@/services/services.service';
import { decorateService, getServiceCardImage } from '@/data/services';
import { getServicesCmsConfig } from '@/services/servicesCmsConfig.service';
import { mergeServicesCmsConfig } from '@/types/servicesCms';
import { SpotlightCard } from '@/components/animations/SpotlightCard';
import { useHomeCms } from '@/contexts/HomeCmsContext';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export const ServicesSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const { featuredServices: homeFeatured } = useHomeCms();

  const { data: cmsConfigApi } = useQuery({
    queryKey: ['servicesCmsConfig'],
    queryFn: getServicesCmsConfig,
    staleTime: 60_000,
  });

  const sectionCopy = mergeServicesCmsConfig(cmsConfigApi).homeSection;
  const viewAllHref = homeFeatured.ctaLink?.trim() || '/services';
  const viewAllLabel = homeFeatured.ctaText?.trim() || sectionCopy.viewAllTitle || 'View All Services';

  const { data: apiServices } = useQuery({
    queryKey: ['activeServices'],
    queryFn: getActiveServices,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const activeServices = [...(apiServices || []).map(decorateService)].sort((a, b) => a.order - b.order);

  const services = useMemo(() => {
    const limit = Math.max(1, homeFeatured.limit || 6);
    const manualSlugs = (homeFeatured.manualSelection || []).map((slug) => slug.trim()).filter(Boolean);

    let selected = activeServices;

    if (manualSlugs.length > 0) {
      const bySlug = new Map(selected.map((service) => [service.slug, service]));
      selected = manualSlugs
        .map((slug) => bySlug.get(slug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service));
    } else if (homeFeatured.featuredOnly) {
      selected = selected.filter((service) => service.featured === true || service.featured === 'true');
    }

    return selected.slice(0, limit);
  }, [activeServices, homeFeatured.featuredOnly, homeFeatured.limit, homeFeatured.manualSelection]);

  if (homeFeatured.visible === false) return null;

  return (
    <SiteSection ref={ref} id="services" variant="muted" aria-labelledby="services-heading" className="relative pt-8 pb-4 md:pt-12 md:pb-6">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeader
          tag={sectionCopy.tag}
          title={homeFeatured.heading?.trim() || sectionCopy.title}
          highlight={sectionCopy.highlight}
          description={homeFeatured.subtitle?.trim() || sectionCopy.description}
          isInView={isInView}
          headingId="services-heading"
        />

        {/* Responsive 3×2 grid: mobile 1 · tablet 2 · desktop 3 */}
        <motion.div
          variants={listContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.slug || service.title} variants={itemVariants} className="h-full">
              <Link
                to={`/services/${service.slug}`}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
              >
                <SpotlightCard
                  className="group relative flex h-full min-h-[200px] flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/95 p-6 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-emerald-500/35 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.1),0_0_0_1px_rgba(16,185,129,0.12)] md:min-h-[220px] md:p-7"
                  spotlightColor="rgba(34, 197, 94, 0.03)"
                  borderColor="rgba(34, 197, 94, 0.18)"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm ring-1 ring-slate-100 transition-all duration-500 group-hover:scale-105 group-hover:ring-emerald-500/25 sm:h-16 sm:w-16">
                    <img
                      src={getServiceCardImage(service)}
                      alt=""
                      className="h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-110 sm:p-3"
                      loading="lazy"
                      decoding="async"
                      sizes="64px"
                    />
                  </div>

                  <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {service.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition-colors duration-300 group-hover:text-emerald-700 sm:text-sm">
                    Explore
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered section CTA — not a peer card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease, delay: 0.35 }}
          className="mt-10 flex justify-center md:mt-12"
        >
          <Button asChild variant="hero" size="lg" className="rounded-xl px-8">
            <Link to={viewAllHref} aria-label={viewAllLabel}>
              {viewAllLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </motion.div>
      </div>
    </SiteSection>
  );
};

export default ServicesSection;
