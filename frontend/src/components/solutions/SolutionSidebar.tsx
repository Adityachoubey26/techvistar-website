import { Button } from '@/components/ui/button';
import { Clock, Calendar, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const SolutionSidebar = () => {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
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
    <div className="lg:sticky lg:top-36 space-y-6">
      
      {/* Consultation Summary Block */}
      <div className="bg-white border-2 border-emerald-500/20 rounded-3xl p-6 shadow-sm space-y-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-emerald-500/[0.03] blur-xl pointer-events-none" />

        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 font-display">
          Consultation Summary
        </h3>

        <div className="space-y-5">
          <div className="flex gap-4 items-start text-xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Average Response Time</p>
              <p className="text-slate-500 mt-0.5">&lt; 4 Hours (Within Business Days)</p>
            </div>
          </div>

          <div className="flex gap-4 items-start text-xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Business Hours</p>
              <p className="text-slate-500 mt-0.5">Monday – Friday, 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="flex gap-4 items-start text-xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Secure Consultation</p>
              <p className="text-slate-500 mt-0.5">All SOW outlines and documentation covered by NDA.</p>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={scrollToForm} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all h-10"
          >
            Book Free Session
          </Button>
        </motion.div>
      </div>

      {/* Direct Inquiries Block */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-md border border-slate-800/80 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -left-10 -bottom-10 w-28 h-28 rounded-full bg-emerald-500/[0.08] blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center text-emerald-400">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-300 font-display">Direct Inquiries</div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Have an SOW ready or need instant escalation? Contact our lead architect directly at:
          </p>

          <div className="pt-2 border-t border-slate-800/80">
            <a 
              href="mailto:architect@techvistar.com?subject=Consultation%20Escalation" 
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline decoration-dotted underline-offset-4"
            >
              architect@techvistar.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SolutionSidebar;
