import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SOLUTIONS_DATA } from '@/data/solutions';

interface SectionProps {
  currentSlug: string;
}

export const SolutionRelatedSection = ({ currentSlug }: SectionProps) => {
  // Get 3 random related solutions (or sequentially next ones)
  const allSolutions = Object.values(SOLUTIONS_DATA);
  const currentIdx = allSolutions.findIndex((s) => s.slug === currentSlug);
  
  // Pick 3 next solutions, wrap around if needed
  const related = [
    allSolutions[(currentIdx + 1) % allSolutions.length],
    allSolutions[(currentIdx + 2) % allSolutions.length],
    allSolutions[(currentIdx + 3) % allSolutions.length]
  ];

  return (
    <section id="related-solutions" className="pt-10 border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">Related Solutions</h2>
          <p className="text-slate-500 mt-2">Explore other enterprise solutions that pair well with this offering.</p>
        </div>
        <Link 
          to="/solutions" 
          className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 transition-colors group text-sm md:text-base"
        >
          View all solutions
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((solution, idx) => (
          <motion.div
            key={solution.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white border border-slate-200 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 overflow-hidden flex flex-col h-full"
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300 mb-6">
                <solution.icon className="w-6 h-6" />
              </div>
              
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
                  {solution.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3">
                  {solution.subtitle}
                </p>
              </div>

              <div className="mt-auto pt-6 flex items-center text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                <Link to={`/solutions/${solution.slug}`} className="absolute inset-0 z-20">
                  <span className="sr-only">View {solution.title}</span>
                </Link>
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
