import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import { SolutionDetail } from '@/data/solutions';
import challengesImg from '@/assets/ai_overview_illustration.png';

interface SolutionHeroProps {
  solution: SolutionDetail;
}

export const SolutionHero = ({ solution }: SolutionHeroProps) => {
  return (
    <section className="bg-white border-b border-slate-200 pt-24 pb-10 md:pt-28 md:pb-14 mb-8">
      <div className="w-full mx-auto px-6 lg:px-12 xl:px-20">
        <Link to="/solutions" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all solutions
        </Link>

        <div className="flex flex-col gap-12 w-full relative z-10">
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  {solution.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-extrabold font-display text-slate-900 leading-tight">
                  {solution.title}
                </h1>
                
                <p className="text-base md:text-lg font-bold text-emerald-600 leading-snug">
                  {solution.subtitle}
                </p>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {solution.ourSolution.overview}
                </p>
              </div>

              <div className="md:col-span-5 flex items-center justify-center py-4 md:py-0">
                <img
                  src={challengesImg}
                  alt={solution.title}
                  className="w-full max-w-[280px] md:max-w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-200/60">
              {solution.metrics && solution.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {solution.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0`}>
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-0.5">{metric.value}</p>
                        <p className="text-[10px] text-slate-500 leading-tight font-semibold">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
