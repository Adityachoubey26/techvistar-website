import { Service } from '@/data/services';

interface SectionProps {
  service: Service;
}

export const OverviewSection = ({ service }: SectionProps) => {
  return (
    <section id="overview" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Overview</h2>
      <p className="text-slate-600 text-base leading-relaxed mb-4">
        {service.longDescription}
      </p>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-700 font-medium">
        {service.overview}
      </div>
    </section>
  );
};
