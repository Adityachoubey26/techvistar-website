import { JsonLd } from '@/components/JsonLd';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';

import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { JoinTeamPreview } from '@/components/JoinTeamPreview';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <>
      <JsonLd />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-background">
        <Navbar />
        <HeroSection showAnnouncementBar />

        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <BenefitsSection />
        <TestimonialsSection />
        <JoinTeamPreview />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
