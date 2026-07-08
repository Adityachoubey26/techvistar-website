import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { SOLUTIONS_DATA } from '@/data/solutions';

// Subcomponents
import { SolutionHero } from '@/components/solutions/SolutionHero';
import { SolutionSectionNavigation } from '@/components/solutions/SolutionSectionNavigation';
import { SolutionOverviewSection } from '@/components/solutions/SolutionOverviewSection';
import { SolutionFeaturesSection } from '@/components/solutions/SolutionFeaturesSection';
import { SolutionProcessSection } from '@/components/solutions/SolutionProcessSection';
import { SolutionBenefitsSection } from '@/components/solutions/SolutionBenefitsSection';
import { SolutionTechStackSection } from '@/components/solutions/SolutionTechStackSection';
import { SolutionRelatedSection } from '@/components/solutions/SolutionRelatedSection';

export const SolutionDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const isDetailLoading = false;
  const solution = slug ? SOLUTIONS_DATA[slug] : undefined;

  useEffect(() => {
    if (!solution && slug !== undefined) {
      navigate('/solutions');
    }
  }, [solution, slug, navigate]);

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
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 mt-12 pb-24">
          <div className="flex flex-col space-y-16">
            <SolutionOverviewSection solution={solution} />
            <SolutionFeaturesSection solution={solution} />
            <SolutionProcessSection solution={solution} />
            <SolutionBenefitsSection solution={solution} />
            <SolutionTechStackSection solution={solution} />
            <SolutionRelatedSection currentSlug={solution.slug} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};
export default SolutionDetails;
