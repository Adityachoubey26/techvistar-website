import { Link } from 'react-router-dom';
import { Service } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { ShieldCheck } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const IndustriesSection = ({ service }: SectionProps) => {
  // Find industries dynamically from INDUSTRIES registry where the service is linked
  const matchedIndustries = INDUSTRIES.filter(
    (ind) => ind.services.includes(service.slug)
  );

  // If no dynamic match, we can check by comparing names from service.industries array
  const finalIndustries = matchedIndustries.length > 0
    ? matchedIndustries
    : INDUSTRIES.filter((ind) => 
        service.industries?.some(sInd => 
          sInd.toLowerCase().includes(ind.title.toLowerCase()) || 
          ind.title.toLowerCase().includes(sInd.toLowerCase())
        )
      );

  return (
    <section id="industries" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Industries We Serve</h2>
      <p className="text-xs text-slate-500 mb-6">
        Adapting our delivery frameworks to the specific requirements of target sectors:
      </p>
      {finalIndustries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {finalIndustries.map((ind) => {
            const IndustryIcon = ind.icon || ShieldCheck;
            return (
              <Link 
                key={ind.id} 
                to={`/industries/${ind.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50/[0.15] transition-all group"
              >
                <span className={`p-2.5 rounded-lg bg-gradient-to-br ${ind.industriesColor} text-white shrink-0 shadow-sm`}>
                  <IndustryIcon className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                    {ind.title}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">
                    Explore solutions &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-slate-500 text-xs font-medium">
          No specific industry connections configured for this service stack.
        </p>
      )}
    </section>
  );
};
