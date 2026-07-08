import { SolutionDetail } from '@/data/solutions';
import { ArrowDown } from 'lucide-react';
import '../ui/GlassIcons.css';

interface SectionProps {
  solution: SolutionDetail;
}

export const SolutionProcessSection = ({ solution }: SectionProps) => {
  return (
    <section id="process" className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 scroll-mt-24 shadow-sm relative overflow-hidden">
      
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="icon-btn pointer-events-none scale-75 origin-top-left -mb-4 -mr-4">
            <span className="icon-btn__back" style={{ background: 'linear-gradient(hsl(210, 90%, 40%), hsl(200, 90%, 40%))' }}></span>
            <span className="icon-btn__front">
              <span className="icon-btn__icon">
                <span className="text-white font-bold font-display">P</span>
              </span>
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">How It Works</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Step-by-step execution strategy</p>
          </div>
        </div>

        <div className="space-y-4">
          {solution.howItWorks.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector Line */}
              {idx !== solution.howItWorks.length - 1 && (
                <div className="absolute left-6 top-14 bottom-[-16px] w-0.5 bg-slate-100 group-hover:bg-emerald-100 transition-colors z-0" />
              )}
              
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/30 transition-all hover:shadow-md relative z-10">
                <div className="flex gap-4 sm:gap-5 items-start">
                  
                  {/* Step Number Badge */}
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors shadow-sm">
                    <span className="text-[10px] sm:text-xs font-black text-slate-400 group-hover:text-emerald-400 transition-colors uppercase">Step</span>
                    <span className="text-sm sm:text-base font-bold text-slate-700 group-hover:text-emerald-600 leading-none">{step.step}</span>
                  </div>

                  <div className="pt-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative arrow between steps */}
              {idx !== solution.howItWorks.length - 1 && (
                <div className="absolute left-[1.1rem] -bottom-3 z-10 text-slate-200 group-hover:text-emerald-300 transition-colors bg-white rounded-full">
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
