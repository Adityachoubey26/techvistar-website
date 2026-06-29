import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { Service } from '@/data/services';
import { useToast } from '@/hooks/use-toast';

interface ServiceHeroProps {
  service: Service;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    description: '',
    agree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agree) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all required fields and accept the agreement.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Inquiry Submitted',
      description: `Thank you, ${formData.name}! We will get back to you in under 4 business hours regarding ${service.title}.`,
    });

    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      budget: '',
      timeline: '',
      description: '',
      agree: false,
    });
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
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
    <section className="bg-white border-b border-slate-200 py-12 mb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/services" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Marketing Info */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/15 font-medium">
              {service.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg font-bold text-primary font-display">
              Accelerate your digital footprint with custom {service.title.toLowerCase()} configurations.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {service.longDescription}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Highlights
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((highlight, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-xs text-slate-700 font-medium">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="bg-primary text-white hover:bg-primary/95">
                <a href="#inquiry-form-card" onClick={scrollToSection('inquiry-form-card')}>
                  Request Proposal
                </a>
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50" asChild>
                <a href="#case-studies" onClick={scrollToSection('case-studies')}>
                  View Case Studies <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div id="inquiry-form-card" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Request a Free Consultation
              </h3>
              <p className="text-[11px] text-slate-500 mb-5 leading-relaxed">
                Describe your requirements and obtain a custom SOW draft from our engineering leads.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="inquiry-name" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="bg-white border-slate-200 text-xs"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="inquiry-company" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Company Name
                    </label>
                    <Input
                      id="inquiry-company"
                      type="text"
                      placeholder="Acme Corp"
                      className="bg-white border-slate-200 text-xs"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-phone" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="inquiry-phone"
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      className="bg-white border-slate-200 text-xs"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="bg-white border-slate-200 text-xs"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="inquiry-budget" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Estimated Budget
                    </label>
                    <Input
                      id="inquiry-budget"
                      type="text"
                      placeholder="e.g. $10k - $20k"
                      className="bg-white border-slate-200 text-xs"
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-timeline" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Timeline
                    </label>
                    <Input
                      id="inquiry-timeline"
                      type="text"
                      placeholder="e.g. 2-3 months"
                      className="bg-white border-slate-200 text-xs"
                      value={formData.timeline}
                      onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-desc" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Project Description
                  </label>
                  <Textarea
                    id="inquiry-desc"
                    placeholder="Outline your milestones or technical stack goals..."
                    className="bg-white border-slate-200 text-xs min-h-[60px]"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="inquiry-agree"
                    type="checkbox"
                    required
                    className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                    checked={formData.agree}
                    onChange={(e) => setFormData((prev) => ({ ...prev, agree: e.target.checked }))}
                  />
                  <label htmlFor="inquiry-agree" className="text-[10px] text-slate-500 leading-snug cursor-pointer selection:bg-transparent">
                    I agree to be contacted by the TechVistar engineering team.
                  </label>
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/95 text-xs font-semibold py-2">
                  Request Free Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
