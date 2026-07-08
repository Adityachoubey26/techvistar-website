import { SolutionDetail } from '@/data/solutions';
import { Target, TrendingUp, Zap, Shield, Maximize } from 'lucide-react';

interface SectionProps {
  solution: SolutionDetail;
}

export const SolutionBenefitsSection = ({ solution }: SectionProps) => {
  const benefitsList = [
    {
      title: 'ROI',
      desc: solution.benefits.roi,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      hoverFrom: 'group-hover:from-blue-50/50',
      hoverTo: 'group-hover:to-transparent'
    },
    {
      title: 'Efficiency',
      desc: solution.benefits.efficiency,
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      hoverFrom: 'group-hover:from-amber-50/50',
      hoverTo: 'group-hover:to-transparent'
    },
    {
      title: 'Scalability',
      desc: solution.benefits.scalability,
      icon: Maximize,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      hoverFrom: 'group-hover:from-indigo-50/50',
      hoverTo: 'group-hover:to-transparent'
    },
    {
      title: 'Security',
      desc: solution.benefits.security,
      icon: Shield,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      hoverFrom: 'group-hover:from-rose-50/50',
      hoverTo: 'group-hover:to-transparent'
    }
  ];

  return (
    <section id="benefits" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 scroll-mt-24 shadow-sm relative overflow-hidden w-full text-white">
      {/* Decorative Background */}
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

      <div className="flex items-center gap-4 mb-10 relative z-10">
        <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm">
          <Target className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Business Benefits</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Measurable impact and value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {benefitsList.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl group relative overflow-hidden h-full flex flex-col hover:-translate-y-1`}>
              {/* Premium Gradient Overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.hoverFrom} ${benefit.hoverTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`h-12 w-12 rounded-xl ${benefit.bg} ${benefit.color} border ${benefit.border} flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default SolutionBenefitsSection;
