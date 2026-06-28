import { motion, useReducedMotion } from 'framer-motion';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PROJECTS, SECTION_PROJECTS } from '@/data/projects';

import { Link } from 'react-router-dom';

export const ProjectsSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const reduceMotion = useReducedMotion();

  const autoScrollPlugins = useMemo(
    () =>
      reduceMotion
        ? []
        : [
            AutoScroll({
              speed: 0.5,
              startDelay: 400,
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ],
    [reduceMotion]
  );

  return (
    <SiteSection ref={ref} id="projects" variant="default" aria-labelledby="projects-heading">
      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_PROJECTS.tag}
          title={SECTION_PROJECTS.title}
          highlight={SECTION_PROJECTS.highlight}
          description={SECTION_PROJECTS.description}
          isInView={isInView}
          headingId="projects-heading"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <Carousel
            opts={{ align: 'start', loop: true }}
            plugins={autoScrollPlugins}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {PROJECTS.map((project, index) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Card className="group h-full flex flex-col overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300">
                      <Link to={`/work/${project.slug}`} className="block relative h-48 overflow-hidden bg-slate-100 border-b border-slate-200">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <CardHeader className="space-y-3 pb-2">
                        <Badge
                          variant="secondary"
                          className="w-fit text-xs font-medium bg-primary/10 text-primary border border-primary/15"
                        >
                          {project.category}
                        </Badge>
                        <CardTitle className="text-lg font-bold font-display text-slate-900 leading-snug hover:text-primary transition-colors">
                          <Link to={`/work/${project.slug}`}>{project.title}</Link>
                        </CardTitle>
                        <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-[7] md:line-clamp-6">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow pt-0">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-medium border border-slate-200/80">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3 mt-auto">
                          <a
                            href={project.liveUrl !== '#' ? project.liveUrl : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                              project.liveUrl === '#'
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                                : 'border-slate-200 text-slate-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                            }`}
                            onClick={(e) => project.liveUrl === '#' && e.preventDefault()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                          <a
                            href={project.githubUrl !== '#' ? project.githubUrl : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                              project.githubUrl === '#'
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                                : 'border-slate-200 text-slate-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                            }`}
                            onClick={(e) => project.githubUrl === '#' && e.preventDefault()}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-primary" />
              <CarouselNext className="-right-4 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-primary" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            Request a technical scoping call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </SiteSection>
  );
};
