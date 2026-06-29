import { Button } from '@/components/ui/button';
import { Clock, Calendar, ShieldCheck, Mail } from 'lucide-react';

export const ServiceSidebar = () => {
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
    <div className="sticky top-28 space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Consultation Summary
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3 items-start text-xs">
            <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">Average Response Time</p>
              <p className="text-slate-500 mt-0.5">&lt; 4 Hours (Within Business Days)</p>
            </div>
          </div>

          <div className="flex gap-3 items-start text-xs">
            <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">Business Hours</p>
              <p className="text-slate-500 mt-0.5">Monday – Friday, 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="flex gap-3 items-start text-xs">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">Secure Consultation</p>
              <p className="text-slate-500 mt-0.5">All SOW outlines and documentation covered by NDA.</p>
            </div>
          </div>
        </div>

        <Button onClick={scrollToForm} className="w-full bg-primary text-white hover:bg-primary/95 text-xs font-semibold py-2">
          Book Free Session
        </Button>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Direct Inquiries</h4>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Have an SOW ready or need instant escalation? Contact our lead architect directly at:
        </p>
        <p className="text-xs font-bold text-primary">
          architect@techvistar.com
        </p>
      </div>
    </div>
  );
};
export default ServiceSidebar;
