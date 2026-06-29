import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Service } from '@/data/services';

interface ServiceHeroProps {
  service: Service;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
  return (
    <section className="bg-white border-b border-slate-200 py-12 mb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/services" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all services
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/15 font-medium mb-3">
              {service.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900 leading-tight mb-4">
              {service.title}
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm aspect-video md:aspect-square bg-slate-50">
              <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
