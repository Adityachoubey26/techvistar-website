import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTACT_INFO, CONTACT_SIDEBAR, SECTION_CONTACT, CONTACT_FORM } from '@/data/contact';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const ContactSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject);
      params.append('message', formData.message);

      const response = await fetch(
        CONTACT_FORM.actionUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }
      );

      if (response.ok) {
        toast({
          title: CONTACT_FORM.toasts.success.title,
          description: CONTACT_FORM.toasts.success.description,
        });
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      toast({
        title: CONTACT_FORM.toasts.error.title,
        description: CONTACT_FORM.toasts.error.description,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SiteSection ref={ref} id="contact" variant="muted" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_CONTACT.tag}
          title={SECTION_CONTACT.title}
          highlight={SECTION_CONTACT.highlight}
          description={SECTION_CONTACT.description}
          isInView={isInView}
          headingId="contact-heading"
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">{CONTACT_SIDEBAR.title}</h3>
              <p className="text-slate-600 leading-relaxed">{CONTACT_SIDEBAR.lead}</p>
            </div>

            <div className="space-y-5">
              {CONTACT_INFO.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.06 + index * 0.04 }}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <info.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-semibold font-display text-slate-900">{info.title}</h4>
                    <p className="text-sm text-slate-600 mt-0.5">{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-primary/20 bg-white p-6 shadow-sm">
              <h4 className="font-semibold font-display text-slate-900 mb-2">{CONTACT_SIDEBAR.slaTitle}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{CONTACT_SIDEBAR.slaBody}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-md"
              aria-label="Project inquiry form"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    {CONTACT_FORM.fields.name.label}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={CONTACT_FORM.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    {CONTACT_FORM.fields.email.label}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={CONTACT_FORM.fields.email.placeholder}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  {CONTACT_FORM.fields.subject.label}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={CONTACT_FORM.fields.subject.placeholder}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  {CONTACT_FORM.fields.message.label}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={CONTACT_FORM.fields.message.placeholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background border-border focus-visible:ring-primary resize-none"
                />
              </div>

              <Button variant="hero" size="lg" type="submit" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? CONTACT_FORM.submittingText : CONTACT_FORM.submitButton}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </SiteSection>
  );
};
