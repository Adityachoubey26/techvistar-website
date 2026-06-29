import { Service } from '@/data/services';
import { Check } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const SolutionsSection = ({ service }: SectionProps) => {
  return (
    <section id="offerings" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.offerings.map((offering, i) => (
          <div key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed items-start p-3 rounded-lg border border-slate-50 hover:border-slate-100 transition-colors">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{offering}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
