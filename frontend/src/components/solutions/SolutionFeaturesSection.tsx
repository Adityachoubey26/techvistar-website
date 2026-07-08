import { SolutionDetail } from '@/data/solutions';
import { Layers } from 'lucide-react';
import '../ui/GlassIcons.css';

interface SectionProps {
  solution: SolutionDetail;
}

export const SolutionFeaturesSection = ({ solution }: SectionProps) => {
  return (
    <section id="features" className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 md:p-8 scroll-mt-24">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
          <Layers className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Features</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Key capabilities of our solution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solution.features.map((feature, idx) => {
          const FeatureIcon = feature.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-emerald-500/30 transition-all hover:shadow-md group">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:from-emerald-50 group-hover:to-teal-50 group-hover:border-emerald-200 transition-colors">
                  <FeatureIcon className="h-5 w-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
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
export default SolutionFeaturesSection;
