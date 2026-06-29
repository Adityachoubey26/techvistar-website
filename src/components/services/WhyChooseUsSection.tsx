import { Service } from '@/data/services';
import { Star } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const WhyChooseUsSection = ({ service }: SectionProps) => {
  const defaultWhy = [
    { title: 'Reliable Delivery Lifecycle', description: 'Every stage is explicitly mapped, scoped, and signed off under clear milestones.' },
    { title: 'Production-Ready Code', description: 'We write fully optimized, tested, and secure components that your internal engineering teams can run easily.' }
  ];

  const list = service.whyChooseUs || defaultWhy;

  return (
    <section id="why-us" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Why Choose TechVistar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {list.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <Star className="h-4 w-4 fill-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
