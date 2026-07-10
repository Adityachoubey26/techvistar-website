import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, Rocket, Clock, DollarSign, TrendingUp, Shield, Star } from 'lucide-react';
import { Industry } from '@/data/industries';
import { getIndustryHeroImage } from '@/data/industry.adapter';
import { RichTextContent } from '@/components/common/RichTextContent';

interface IndustryHeroProps {
  industry: Industry;
}

export const IndustryHero = ({ industry }: IndustryHeroProps) => {
  const getStatIcon = (iconType?: string) => {
    switch (iconType) {
      case 'clock':
        return Clock;
      case 'dollar':
        return DollarSign;
      case 'chart':
        return TrendingUp;
      case 'shield':
        return Shield;
      case 'star':
        return Star;
      default:
        return Rocket;
    }
  };

  const getThemeClasses = (colorTheme?: string) => {
    switch (colorTheme) {
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'gold':
        return 'bg-amber-100 text-amber-600';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-emerald-100 text-emerald-600';
    }
  };

  return (
    <section className="border-b border-slate-200 bg-white pb-10 pt-24 md:pb-14 md:pt-28">
      <div className="mx-auto w-full px-6 lg:px-12 xl:px-20">
        <Link
          to="/industries"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all industries
        </Link>

        <div className="relative z-10 flex w-full flex-col gap-12">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
            <div className="space-y-5 md:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                {industry.heroBadge?.trim() || `${industry.title} Vertical`}
              </div>

              <h1 className="font-display text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                {industry.title}
              </h1>

              <p className="text-base font-bold leading-snug text-emerald-600 md:text-lg">
                {industry.heroTagline?.trim() || industry.shortDescription}
              </p>

              <RichTextContent
                content={industry.description}
                className="text-sm leading-relaxed text-slate-600"
              />

              {industry.benefits && industry.benefits.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Highlights
                  </p>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                    {industry.benefits.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                        <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 p-0.5">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center py-4 md:col-span-5 md:py-0">
              <img
                src={getIndustryHeroImage(industry)}
                alt={industry.title}
                className="h-auto w-full max-w-[280px] rounded-2xl border border-slate-200/80 object-cover shadow-lg md:max-w-full"
              />
            </div>
          </div>

          {industry.statistics && industry.statistics.length > 0 && (
            <div className="space-y-6 border-t border-slate-200/60 pt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {industry.statistics.map((stat, idx) => {
                  const IconComponent = getStatIcon(stat.iconType);
                  const theme = getThemeClasses(stat.colorTheme);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${theme}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="mb-0.5 text-sm font-bold leading-none text-slate-900">{stat.value}</p>
                        <p className="text-[10px] font-semibold leading-tight text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndustryHero;
