import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const JoinTeamPreview = () => {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-3">
          Join Our Team
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Build innovative digital products with TechVistar and grow your career alongside a passionate engineering and design team.
        </p>
        <Button asChild className="bg-primary text-white hover:bg-primary/95 shadow-sm rounded-lg font-semibold px-6 py-2">
          <Link to="/careers" className="inline-flex items-center gap-2">
            Explore Careers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default JoinTeamPreview;
