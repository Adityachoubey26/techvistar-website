import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '@/data/industries';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { PROCESS_STEPS } from '@/data/process';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import { 
  ArrowLeft, 
  ChevronRight, 
  AlertTriangle, 
  Lightbulb, 
  Check, 
  Layers, 
  Briefcase, 
  Cpu, 
  Workflow, 
  HelpCircle,
  Image
} from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SpotlightCard } from '@/components/animations/SpotlightCard';
import { resolveSpotlightColors } from './Industries';
import servicesBg from '../assets/services-bg.png'; // Reusing premium background asset

export const IndustryDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Find dynamic industry details
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  // Set page title & reset scroll
  useEffect(() => {
    if (industry) {
      document.title = `${industry.title} Industry Solutions | TechVistar`;
    } else {
      document.title = 'Industry Not Found | TechVistar';
    }
    window.scrollTo(0, 0);
  }, [industry]);

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

  if (!industry) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfa] px-4 pt-20">
          <div className="w-full max-w-md rounded-2xl border border-slate-200/65 bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
            <h1 className="text-2xl md:text-3xl font-black font-display text-teal-955 tracking-tight mb-3">
              Industry Not Found
            </h1>
            <p className="text-slate-655 text-xs sm:text-sm leading-relaxed mb-8 font-medium">
              We couldn't find the industry sector you were looking for. It may have been moved or updated.
            </p>
            <Button asChild className="w-full bg-primary text-white hover:bg-primary/95 rounded-xl font-bold">
              <Link to="/industries">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Industries
              </Link>
            </Button>
          </div>
          <Footer />
        </main>
      </>
    );
  }

  const Icon = industry.icon;
  const colors = resolveSpotlightColors(industry.id);

  // Resolve related services and projects objects
  const relatedServicesData = SERVICES.filter((s) => industry.services.includes(s.slug) && s.status === 'active');
  const relatedProjectsData = PROJECTS.filter((p) => industry.caseStudies.includes(p.slug));

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-[#fafbfa]">
        <Navbar />

        {/* Hero Section Redesigned with dynamic split cover image */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-[#041d1a] to-zinc-950 pt-24 pb-20 md:pt-36 md:pb-28 border-b border-emerald-950/40"
        >
          {/* Background Mesh Wave */}
          <motion.div 
            className="absolute inset-0 opacity-70 pointer-events-none z-0"
            style={{ 
              backgroundImage: `url(${servicesBg})`,
              backgroundSize: 'auto 100%',
              backgroundPosition: 'right',
              backgroundRepeat: 'no-repeat',
            }}
            animate={{
              x: [0, 4, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url(${servicesBg})`,
                backgroundSize: 'auto 100%',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
              }}
              animate={{
                x: mousePosition.x * 5,
                y: mousePosition.y * 5,
              }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
            />
          </motion.div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none" />

          {/* Dynamic background glow matching industry color */}
          <div className={`absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br ${industry.industriesColor} opacity-[0.08] blur-[110px] pointer-events-none`} />

          <div className="container-custom max-w-5xl mx-auto px-4 relative z-10">
            <Link 
              to="/industries" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-350 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Industries</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-2">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <Badge variant="outline" className="bg-emerald-500/15 text-emerald-450 border-emerald-500/25 font-black uppercase tracking-[0.15em] text-[10px] px-2.5 py-0.5 rounded-full">
                    Industry Verticals
                  </Badge>
                  {relatedProjectsData.length > 0 && (
                    <Badge variant="secondary" className="bg-white/10 text-white font-semibold text-[10px] px-2.5 py-0.5 border border-white/5 rounded-full">
                      {relatedProjectsData.length} Case Studies Deployed
                    </Badge>
                  )}
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                  {industry.title}
                </h1>
                <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 font-semibold leading-relaxed max-w-2xl">
                  {industry.shortDescription}
                </p>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                {/* Dynamically renders cover image inside rounded container */}
                <div className="relative group/cover rounded-3xl overflow-hidden border border-white/15 shadow-2xl max-w-sm w-full h-64 bg-slate-800">
                  {industry.heroImage ? (
                    <img 
                      src={industry.heroImage} 
                      alt={industry.title} 
                      className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Image className="h-10 w-10 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 p-3 rounded-2xl bg-white/90 backdrop-blur text-emerald-600 border border-emerald-100/35 shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Overview & Statistics Section Redesigned */}
        <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Overview Detail */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
                Overview & Sector Focus
              </h2>
              <div className="border-l-4 border-emerald-500 pl-4 py-1.5 mt-4">
                <p className="text-slate-655 text-sm sm:text-base leading-relaxed font-semibold italic">
                  "Adapting our VISTAR delivery frameworks to the precise requirements of target industries, securing data contracts, and scaling customer interfaces."
                </p>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium pt-3">
                {industry.description}
              </p>
            </div>

            {/* Statistics Sidebar Grid */}
            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industry.statistics.map((stat, index) => (
                  <SpotlightCard 
                    key={index}
                    spotlightColor={colors.spotlight}
                    borderColor={colors.border}
                    className="border border-slate-200/50 bg-white p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(10,46,43,0.02)] flex flex-col justify-between"
                  >
                    <div>
                      <div className={`text-3xl font-black bg-gradient-to-r ${industry.industriesColor} bg-clip-text text-transparent w-fit`}>
                        {stat.value}
                      </div>
                      <div className="text-teal-955 text-[11px] font-black uppercase tracking-wider mt-2.5">
                        {stat.label}
                      </div>
                    </div>
                    {stat.description && (
                      <p className="text-slate-450 text-[11px] font-medium mt-2 leading-relaxed border-t border-slate-50 pt-2">
                        {stat.description}
                      </p>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Business Challenges Redesigned as vertical list with staggered numbered tags */}
        <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
                Business Challenges We Resolve
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-8">
              Every vertical sector contains unique bottlenecks that slow development cycles and introduce compliance risks:
            </p>
            <div className="space-y-6">
              {industry.challenges.map((challenge, index) => (
                <SpotlightCard 
                  key={index} 
                  spotlightColor="rgba(239, 68, 68, 0.02)"
                  borderColor="rgba(239, 68, 68, 0.15)"
                  className="flex flex-col sm:flex-row gap-4 sm:items-start border border-slate-200/40 bg-white p-5 rounded-2xl shadow-sm hover:scale-[1.005] transition-all"
                >
                  <div className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-100/60 text-[10px] font-black uppercase tracking-wider shrink-0 w-fit">
                    Challenge 0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-teal-955 text-base mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Our Solutions Redesigned as 2-column grid with custom backgrounds */}
        <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-emerald-500 shrink-0" />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
              Our Engineering Solutions
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-8">
            Deploying secure, modern, and high-performance digital platforms configured for your workflows:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.solutions.map((solution, index) => (
              <SpotlightCard 
                key={index} 
                spotlightColor="rgba(16, 185, 129, 0.04)"
                borderColor="rgba(16, 185, 129, 0.2)"
                className="border border-emerald-100/60 bg-emerald-50/[0.12] p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(16,185,129,0.02)]"
              >
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 mb-1 block">
                      Solution Strategy 0{index + 1}
                    </span>
                    <h3 className="font-display font-extrabold text-teal-955 text-base mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Related Services Redesigned as horizontal spotlight deck */}
        {relatedServicesData.length > 0 && (
          <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-teal-900 shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
                Related Services
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-8">
              Explore the core software stack and design methodologies utilized in this sector:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedServicesData.map((svc) => {
                const SvcIcon = svc.icon;
                return (
                  <Link 
                    key={svc.id} 
                    to={`/services/${svc.slug}`}
                    className="group block rounded-2xl overflow-hidden"
                  >
                    <SpotlightCard
                      spotlightColor={colors.spotlight}
                      borderColor={colors.border}
                      className="border border-slate-200/50 bg-white p-6 rounded-2xl shadow-[0_4px_25px_-4px_rgba(10,46,43,0.02)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.05)] hover:scale-[1.01] transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="p-2.5 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-primary group-hover:text-white border border-slate-100 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm shrink-0">
                          <SvcIcon className="h-4.5 w-4.5" />
                        </span>
                        <h3 className="font-display font-extrabold text-teal-955 group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
                          {svc.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2 mb-4">
                        {svc.shortDescription}
                      </p>
                      <span className="text-[10px] font-bold text-primary flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                        Explore service details <ChevronRight className="h-3 w-3" />
                      </span>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Case Studies Redesigned as horizontal split layout deck */}
        {relatedProjectsData.length > 0 && (
          <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-teal-900 shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
                Related Case Studies
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-8">
              Real outcomes, scalable codebases, and integrations successfully shipped:
            </p>
            <div className="grid grid-cols-1 gap-6">
              {relatedProjectsData.map((proj) => (
                <Link 
                  key={proj.id} 
                  to={`/work/${proj.slug}`}
                  className="group block rounded-2xl overflow-hidden"
                >
                  <SpotlightCard
                    spotlightColor={colors.spotlight}
                    borderColor={colors.border}
                    className="flex flex-col md:flex-row gap-6 border border-slate-200/50 bg-white p-5 rounded-2xl shadow-[0_4px_25px_-4px_rgba(10,46,43,0.02)] hover:shadow-[0_16px_36px_rgb(0,0,0,0.05)] hover:scale-[1.003] transition-all duration-300"
                  >
                    {proj.thumbnail && (
                      <div className="w-full md:w-[32%] h-44 rounded-xl overflow-hidden shrink-0 bg-slate-50 relative border border-slate-200/40">
                        <img 
                          src={proj.thumbnail} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                            {proj.category}
                          </span>
                          <span className="text-[10px] text-slate-400">|</span>
                          <span className="text-[10px] font-bold text-slate-400">
                            Client: {proj.client}
                          </span>
                        </div>
                        <h3 className="font-display font-extrabold text-teal-955 group-hover:text-primary transition-colors text-lg sm:text-xl mt-1">
                          {proj.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mt-2.5">
                          {proj.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-50">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-[9px] text-slate-400 border-slate-200 bg-white px-2 py-0.5 rounded">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1.5 transition-transform shrink-0">
                          View details <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Core Tech Stack Section */}
        <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-5 w-5 text-teal-900 shrink-0" />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
              Associated Technologies
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-6">
            Utilizing leading edge frameworks, vectors databases, APIs, and cloud services:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {industry.technologies.map((tech) => (
              <Badge 
                key={tech} 
                className="bg-slate-50 hover:bg-slate-100 text-slate-650 border border-slate-200/60 font-bold px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-[1.04]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Delivery Process Section Redesigned */}
        <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="h-5 w-5 text-teal-900 shrink-0" />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
              Our Delivery Process
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-8">
            We follow our structured, governance-first delivery framework to ensure all integrations, security layers, and data contracts remain auditable.
          </p>
          <div className="relative border-l border-slate-200/80 ml-3 pl-6 space-y-8 mt-6">
            {PROCESS_STEPS.map((step, idx) => {
              return (
                <div key={idx} className="relative group/timeline">
                  {/* Dot step indicator */}
                  <span className="absolute -left-[35px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-emerald-500 text-emerald-600 font-bold text-xs group-hover/timeline:scale-110 group-hover/timeline:bg-emerald-500 group-hover/timeline:text-white transition-all">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-extrabold text-teal-955 text-sm sm:text-base group-hover/timeline:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.deliverables.map((deliv, dIdx) => (
                        <Badge key={dIdx} variant="outline" className="text-[9px] bg-slate-50/50 text-slate-500 border-slate-200/60 font-semibold py-0.5 px-2 rounded-lg transition-transform hover:scale-[1.03]">
                          {deliv}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section Redesigned */}
        {industry.faqs.length > 0 && (
          <section className="py-16 md:py-24 container-custom max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-teal-900 shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-955 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3.5 mt-6">
              {industry.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-slate-200/50 bg-white rounded-2xl px-5 overflow-hidden shadow-[0_4px_20px_-4px_rgba(10,46,43,0.02)] transition-all"
                >
                  <AccordionTrigger className="hover:no-underline font-display font-extrabold text-teal-955 text-xs sm:text-sm text-left py-4.5 transition-colors hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed pt-0 pb-4.5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Dynamic CTA Section Redesigned */}
        <section className="bg-gradient-to-br from-zinc-950 via-[#031c19] to-zinc-950 border-t border-emerald-950/40 py-20 md:py-24 relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-550/5 blur-[120px] pointer-events-none" />
          
          <div className="container-custom max-w-4xl mx-auto text-center px-4 relative z-10">
            <Badge variant="outline" className="mb-4 bg-emerald-550/10 text-emerald-450 border-emerald-550/20 font-black uppercase tracking-[0.2em] text-[10px] px-3.5 py-1 rounded-full">
              Let's partner up
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mt-3">
              {industry.cta.title}
            </h2>
            {industry.cta.subtitle && (
              <p className="mt-5 text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
                {industry.cta.subtitle}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto font-bold rounded-xl shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.02]" asChild>
                <Link to={industry.cta.buttonLink}>{industry.cta.buttonText}</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/10 bg-white/5 hover:bg-white/10 hover:text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]" asChild>
                <Link to="/industries">Browse Other Verticals</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default IndustryDetails;
