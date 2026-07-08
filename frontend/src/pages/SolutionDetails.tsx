import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSolutionBySlug } from '@/services/solutions.service';
import { decorateSolution } from '@/data/solutions';

// Subcomponents
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { SolutionSectionNavigation } from '@/components/solutions/SolutionSectionNavigation';
import { SolutionOverviewSection } from '@/components/solutions/SolutionOverviewSection';
import { SolutionFeaturesSection } from '@/components/solutions/SolutionFeaturesSection';
import { SolutionProcessSection } from '@/components/solutions/SolutionProcessSection';
import { SolutionBenefitsSection } from '@/components/solutions/SolutionBenefitsSection';
import { SolutionTechStackSection } from '@/components/solutions/SolutionTechStackSection';
import { SolutionSidebar } from '@/components/solutions/SolutionSidebar';
import { CTASection } from '@/components/services/CTASection';

export const SolutionDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: apiSolution, isLoading: isDetailLoading } = useQuery({
    queryKey: ['solutionDetails', slug],
    queryFn: () => getSolutionBySlug(slug || ''),
    enabled: !!slug,
  });

  const solution = apiSolution ? decorateSolution(apiSolution) : undefined;

  useEffect(() => {
    if (!isDetailLoading && !solution && slug !== undefined) {
      navigate('/solutions');
    }
  }, [isDetailLoading, solution, slug, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isDetailLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
          <div className="text-slate-500 font-display flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading solution details...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!solution) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-0">
        
        {/* Hero Section */}
        <SolutionHero solution={solution} />

        {/* Sticky Sub-Navbar */}
        <SolutionSectionNavigation />

        {/* Dynamic Detail Modules Content Area */}
        <section className="w-full mx-auto px-6 lg:px-12 xl:px-20 mt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Main Column for Detail Blocks */}
            <div className="lg:col-span-2 space-y-8">
              <SolutionOverviewSection solution={solution} />
              <SolutionFeaturesSection solution={solution} />
              <SolutionProcessSection solution={solution} />
              <SolutionBenefitsSection solution={solution} />
              <SolutionTechStackSection solution={solution} />
            </div>

            {/* Right Column Sidebar */}
            <div className="space-y-6">
              <SolutionSidebar />
            </div>

          </div>

          {/* Bottom Conversion Section */}
          <div className="mt-16">
            <CTASection service={solution as any} />
          </div>

        </section>

        <Footer />
      </main>
    </>
  );
};
export default SolutionDetails;
