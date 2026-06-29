import { Service } from '@/data/services';
import { PROJECTS, Project } from '@/data/projects';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SectionProps {
  service: Service;
}

export const CaseStudiesSection = ({ service }: SectionProps) => {
  // Query projects dynamically where serviceSlugs matches current service's slug
  const relatedProjects = PROJECTS.filter((project: Project) => 
    project.serviceSlugs && project.serviceSlugs.includes(service.slug)
  );

  return (
    <section id="case-studies" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-display">Case Studies & Projects</h2>
      
      {relatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all overflow-hidden flex flex-col bg-slate-50/30"
            >
              <div className="relative h-40 overflow-hidden bg-slate-100 border-b border-slate-150">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border border-primary/15">
                    {project.category}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600 bg-slate-50">
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                  <Link to={`/work/${project.slug}`}>{project.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                <Link 
                  to={`/work/${project.slug}`} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-auto"
                >
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-slate-50 border border-slate-100 p-6 text-center">
          <Briefcase className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-3">Custom integration case studies are available upon request.</p>
          <a href="#contact" className="inline-flex items-center text-xs font-semibold text-primary hover:underline">
            Request past build logs <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </a>
        </div>
      )}
    </section>
  );
};
