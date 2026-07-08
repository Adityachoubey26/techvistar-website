import { SolutionDetail } from '@/data/solutions';
import { Target, TrendingUp, Zap, Shield, Maximize } from 'lucide-react';
import '../ui/GlassIcons.css';

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
      groupBorder: 'group-hover:border-blue-200'
    },
    {
      title: 'Efficiency',
      desc: solution.benefits.efficiency,
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      groupBorder: 'group-hover:border-amber-200'
    },
    {
      title: 'Scalability',
      desc: solution.benefits.scalability,
      icon: Maximize,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      groupBorder: 'group-hover:border-indigo-200'
    },
    {
      title: 'Security',
      desc: solution.benefits.security,
      icon: Shield,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      groupBorder: 'group-hover:border-rose-200'
    }
  ];

  return (
    <section id="benefits" className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 scroll-mt-24 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm">
          <Target className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Business Benefits</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Measurable impact and value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {benefitsList.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className={`bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-md transition-all group ${benefit.groupBorder}`}>
              <div className="flex gap-4 items-start">
                <div className={`h-10 w-10 rounded-xl ${benefit.bg} ${benefit.color} border ${benefit.border} flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
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
