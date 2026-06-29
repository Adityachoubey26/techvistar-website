import { Service } from '@/data/services';

interface SectionProps {
  service: Service;
}

export const TechnologySection = ({ service }: SectionProps) => {
  return (
    <section id="technology" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Technology Stack</h2>
      <p className="text-xs text-slate-500 mb-4">
        Our core execution stacks and tools mapped to this service dynamic:
      </p>
      <div className="flex flex-wrap gap-2">
        {service.technologies.map((tech) => (
          <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:border-primary/20 hover:bg-primary/[0.02] transition-colors">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
};
