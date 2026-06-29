import { Service } from '@/data/services';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar } from 'lucide-react';

interface SectionProps {
  service: Service;
}

export const CTASection = ({ service }: SectionProps) => {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('inquiry-form-card');
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white shadow-md scroll-mt-24 text-center max-w-4xl mx-auto">
      <h2 className="text-xl md:text-3xl font-bold font-display mb-3">
        Ready to build your next digital product?
      </h2>
      <p className="text-white/80 text-xs md:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
        {service.cta || 'Let\'s collaborate on structuring and engineering your next web portal or AI integration.'}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={scrollToForm} className="bg-white text-primary hover:bg-slate-50 font-bold border-none shadow-none px-6 py-2.5 rounded-lg inline-flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Book Free Consultation
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-6 py-2.5 rounded-lg inline-flex items-center gap-2" asChild>
          <a href="mailto:architect@techvistar.com?subject=Consultation%20Escalation">
            <MessageSquare className="h-4 w-4" />
            Talk to an Expert
          </a>
        </Button>
      </div>
    </section>
  );
};
