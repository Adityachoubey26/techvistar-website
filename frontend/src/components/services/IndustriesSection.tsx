import { Service } from '@/data/services';
import { ShieldCheck } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const IndustriesSection = ({ service }: SectionProps) => {
  const industries = service.industries || ['Enterprise Systems', 'Healthcare Systems', 'E-Commerce Platforms', 'SaaS Ventures'];

  return (
    <section id="industries" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Industries We Serve</h2>
      <p className="text-xs text-slate-500 mb-6">
        Adapting our delivery frameworks to the specific requirements of target sectors:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {industries.map((ind) => (
          <div key={ind} className="flex flex-col p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-primary/10 transition-colors">
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs font-semibold text-slate-800 leading-snug">{ind}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
