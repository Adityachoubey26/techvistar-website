import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getActiveServices } from '@/services/services.service';
import { Service, decorateService } from '@/data/services';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

import servicesBg from '../assets/services-bg.png';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

  const { data: apiServices, isLoading } = useQuery({
    queryKey: ['activeServices'],
    queryFn: getActiveServices,
  });

  // Filter out active services
  const activeServices = (apiServices || []).map(decorateService);

  // Get unique categories dynamically
  const categories = ['All', ...Array.from(new Set(activeServices.map((s) => s.category)))];

  // Filter services by category
  const filteredServices = selectedCategory === 'All'
    ? activeServices
    : activeServices.filter((s) => s.category === selectedCategory);

  // Sort by order
  const sortedServices = [...filteredServices].sort((a, b) => a.order - b.order);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-slate-50">
        <Navbar />

        {/* Services Hero */}
        <PageHeader 
          title="Our Services"
          subtitle="What We Do"
          description="We offer structured, productized growth services spanning full-stack delivery, revenue operations, automation, and applied artificial intelligence."
          backgroundImage={servicesBg}
        />

                {/* Category Filters */}
        <section className="py-8 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {sortedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedServices.map((service: Service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className="group h-full flex flex-col overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/25 transition-all duration-[450ms] ease-in-out"
                    >
                      {/* Service Cover Image */}
                      <div className="overflow-hidden bg-white" style={{ borderRadius: '20px 20px 0 0' }}>
                        <img
                          src={service.coverImage}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-[200px] md:h-[250px] object-contain p-2 transition-transform duration-[450ms] ease-in-out group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="space-y-3 pb-2">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="w-fit text-xs font-medium bg-primary/10 text-primary border border-primary/15"
                          >
                            {service.category}
                          </Badge>
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-primary group-hover:scale-105 transition-transform">
                            <IconComponent className="h-5 w-5" />
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold font-display text-slate-900 leading-snug hover:text-primary transition-colors">
                          <Link to={`/services/${service.slug}`}>{service.title}</Link>
                        </CardTitle>
                        <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow pt-0 justify-between">
                        <div className="mt-4 mb-6">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2.5">
                            Key Offerings
                          </p>
                          <ul className="space-y-2">
                            {service.offerings.slice(0, 3).map((item, index) => (
                              <li key={index} className="flex gap-2 text-xs text-slate-600 items-start">
                                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          to={`/services/${service.slug}`}
                          className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl max-w-md mx-auto px-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">No services found.</h3>
                <p className="text-slate-500 text-sm">
                  Try changing your category filter.
                </p>
              </div>
            )}
          </div>
        </section>


        <Footer />
      </main>
    </>
  );
};

export default Services;
