import { SolutionDetail } from '@/data/solutions';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface SectionProps {
  solution: SolutionDetail;
}

export const SolutionProcessSection = ({ solution }: SectionProps) => {
  return (
    <section id="process" className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 scroll-mt-24 shadow-sm relative overflow-hidden w-full">
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="icon-btn pointer-events-none scale-75 origin-top-left -mb-4 -mr-4">
            <span className="icon-btn__back" style={{ background: 'linear-gradient(hsl(210, 90%, 40%), hsl(200, 90%, 40%))' }}></span>
            <span className="icon-btn__front">
              <span className="icon-btn__icon">
                <span className="text-white font-bold font-display">P</span>
              </span>
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">How It Works</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Step-by-step execution strategy</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Horizontal connecting line (Desktop only) */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-slate-100 z-0" />

          {solution.howItWorks.map((step, idx) => (
            <div key={idx} className="relative group flex-1">
              {/* Vertical connecting line (Mobile/Tablet only) */}
              {idx !== solution.howItWorks.length - 1 && (
                <div className="lg:hidden absolute left-6 top-14 bottom-[-24px] w-0.5 bg-slate-100 group-hover:bg-emerald-100 transition-colors z-0" />
              )}
              
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 relative z-10 h-full flex flex-col">
                <div className="flex lg:flex-col gap-5 items-start h-full">
                  
                  {/* Step Number Badge */}
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors shadow-sm relative z-10">
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-emerald-400 transition-colors uppercase leading-none mt-1">Step</span>
                    <span className="text-base font-bold text-slate-700 group-hover:text-emerald-600 leading-none">{step.step}</span>
                  </div>

                  <div className="pt-1 lg:pt-2 flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative arrow between steps (Desktop) */}
              {idx !== solution.howItWorks.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-4 z-20 text-slate-300 bg-white rounded-full p-1 border border-slate-100 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              {/* Decorative arrow between steps (Mobile) */}
              {idx !== solution.howItWorks.length - 1 && (
                <div className="lg:hidden absolute left-[1.15rem] -bottom-4 z-20 text-slate-300 bg-white rounded-full">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SolutionProcessSection;
