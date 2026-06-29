import { Service } from '@/data/services';
import { Button } from '@/components/ui/button';

interface SectionProps {
  service: Service;
}

export const CTASection = ({ service }: SectionProps) => {
  return (
    <section id="contact" className="bg-gradient-to-r from-primary to-emerald-600 rounded-xl p-6 text-white shadow-md scroll-mt-24">
      <h3 className="text-lg font-bold font-display mb-2">Ready to scope?</h3>
      <p className="text-white/80 text-xs leading-relaxed mb-6">
        {service.cta}
      </p>
      <Button asChild className="w-full bg-white text-primary hover:bg-slate-50 font-bold border-none shadow-none">
        <a href="/#contact">Get Started</a>
      </Button>
    </section>
  );
};
