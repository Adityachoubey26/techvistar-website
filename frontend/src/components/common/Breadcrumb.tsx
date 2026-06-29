import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { SERVICES } from '@/data/services';

export const Breadcrumb = () => {
  const location = useLocation();
  
  // Extract path segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are on the homepage, don't render breadcrumbs
  if (pathnames.length === 0) return null;

  // Resolve titles for dynamic slugs
  const getBreadcrumbName = (segment: string, index: number) => {
    const parentSegment = index > 0 ? pathnames[index - 1] : '';

    if (parentSegment === 'work') {
      const project = PROJECTS.find((p) => p.slug === segment);
      if (project) return project.title;
    }

    if (parentSegment === 'services') {
      const service = SERVICES.find((s) => s.slug === segment);
      if (service) return service.title;
    }

    // Static mappings
    const staticMap: Record<string, string> = {
      about: 'About Us',
      work: 'Portfolio',
      services: 'Services',
      careers: 'Careers',
      contact: 'Contact Us',
    };

    if (staticMap[segment]) {
      return staticMap[segment];
    }

    // Fallback: title case the segment
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 py-3 border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-6xl overflow-x-auto no-scrollbar scroll-smooth flex items-center whitespace-nowrap">
        <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {/* Home Link */}
          <li className="flex items-center">
            <Link 
              to="/" 
              className="hover:text-slate-700 transition-colors focus:outline-none focus:underline"
            >
              Home
            </Link>
          </li>

          {pathnames.map((segment, index) => {
            const url = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = getBreadcrumbName(segment, index);

            return (
              <li key={url} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-slate-350 shrink-0 select-none" />
                
                {isLast ? (
                  <span className="text-primary font-black select-all" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={url}
                    className="hover:text-slate-700 transition-colors focus:outline-none focus:underline"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
