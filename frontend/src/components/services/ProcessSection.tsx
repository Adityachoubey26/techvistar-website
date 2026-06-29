import { Service } from '@/data/services';

interface SectionProps {
  service: Service;
}

export const ProcessSection = ({ service }: SectionProps) => {
  return (
    <section id="process" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-6 font-display">Development Process</h2>
      <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
        {service.process.map((step) => (
          <div key={step.step} className="flex gap-4 relative">
            <div className="h-7 w-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm">
              {step.step}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
