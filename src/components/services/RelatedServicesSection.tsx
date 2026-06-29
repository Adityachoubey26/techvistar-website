import { Service, SERVICES } from '@/data/services';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SectionProps {
  service: Service;
}

export const RelatedServicesSection = ({ service }: SectionProps) => {
  const relatedServices = SERVICES.filter((s) => s.id !== service.id && s.status === 'active')
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section id="related" className="border-t border-slate-200 pt-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 font-display">Other Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedServices.map((rs) => (
          <Card key={rs.id} className="border-slate-200 bg-white hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2">
              <Badge variant="secondary" className="w-fit text-[10px] bg-primary/10 text-primary mb-1">
                {rs.category}
              </Badge>
              <CardTitle className="text-sm font-bold text-slate-900 font-display line-clamp-1">
                <Link to={`/services/${rs.slug}`} className="hover:text-primary">
                  {rs.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-slate-600 text-xs line-clamp-2 mb-3">
                {rs.shortDescription}
              </p>
              <Link to={`/services/${rs.slug}`} className="text-xs font-semibold text-primary hover:underline">
                View details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
