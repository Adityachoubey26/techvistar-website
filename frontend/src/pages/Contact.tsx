import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, ShieldCheck, PhoneCall, Sparkles, 
  Linkedin, ArrowRight, Send, CheckCircle, HelpCircle, ArrowUpRight 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CONTACT_INFO, CONTACT_FORM, CONTACT_SIDEBAR } from '@/data/contact';

// Custom Floating Input Component
interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const FloatingInput = ({ id, label, value, onChange, type = "text", required = false }: FloatingInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-5 pt-5 pb-1 text-white placeholder-transparent focus:outline-none focus:border-emerald-500/80 focus:bg-white/[0.05] transition-all font-semibold text-sm"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none transition-all duration-200",
          (focused || value) && "top-3.5 text-[10px] text-emerald-400 -translate-y-0"
        )}
      >
        {label}
      </label>
    </div>
  );
};

// Custom Floating Textarea Component
interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const FloatingTextarea = ({ id, label, value, onChange, required = false, rows = 5 }: FloatingTextareaProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-emerald-500/80 focus:bg-white/[0.05] transition-all font-semibold text-sm resize-none"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-5 top-6 text-slate-400 text-sm font-semibold pointer-events-none transition-all duration-200",
          (focused || value) && "top-2.5 text-[10px] text-emerald-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

// Custom FAQ Accordion Component
interface FAQAccordionProps {
  question: string;
  answer: string;
}

const FAQAccordion = ({ question, answer }: FAQAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-display font-extrabold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors py-1"
      >
        <span>{question}</span>
        <span className="text-emerald-500 font-normal text-xl ml-4">{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2 pb-2 font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject);
      params.append('message', formData.message);

      const response = await fetch(CONTACT_FORM.actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (response.ok) {
        toast({
          title: CONTACT_FORM.toasts.success.title,
          description: CONTACT_FORM.toasts.success.description,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // FAQ mock data
  const faqs = [
    {
      q: 'Why Choose TechVistar?',
      a: 'We connect engineering excellence, secure data integrations, and marketing automation under structured scopes with measurable metrics. We hand over fully-documented software your team can own and audit.'
    },
    {
      q: 'What is your response time SLA?',
      a: 'We guarantee a first response to new project and support inquiries within 24 business hours (IST). Existing production clients have access to priority lines.'
    },
    {
      q: 'What are your operational business hours?',
      a: 'Our team operates Monday through Friday, 9:30 AM to 6:30 PM (IST). Critical server monitoring runs 24/7/365.'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Premium dark mesh gradient main container */}
      <main id="main-content" className="min-h-screen bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden">
        
        {/* Animated Mesh Gradients */}
        <div className="absolute top-0 inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div 
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[140px]" 
          />
          <motion.div 
            animate={{
              x: [0, -50, 40, 0],
              y: [0, 30, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-teal-500/[0.05] blur-[150px]" 
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/[0.02] rounded-full blur-[180px]" />
        </div>

        {/* HERO SECTION */}
        <section className="container-custom py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Connect with TechVistar</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white mb-6 leading-[1.1]"
            >
              Let's Build Something <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">Great Together</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-xl font-semibold max-w-2xl mx-auto leading-relaxed"
            >
              Have a platform concept, complex architecture inquiry, or software deployment goals? Share details below.
            </motion.p>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
            
            {/* LEFT COLUMN: Contact Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold font-display text-white mb-2 tracking-wide uppercase text-xs text-slate-400 px-1">
                  Contact Information
                </h3>
                
                {/* Phone Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white text-sm sm:text-base">Direct Phone</h4>
                    <a href="tel:+919573157982" className="text-xs sm:text-sm text-slate-400 font-semibold mt-1 hover:text-emerald-400 transition-colors block">
                      +91 9573157982
                    </a>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white text-sm sm:text-base">Business Email</h4>
                    <a href="mailto:support@techvistar.com" className="text-xs sm:text-sm text-slate-400 font-semibold mt-1 hover:text-emerald-400 transition-colors block">
                      support@techvistar.com
                    </a>
                  </div>
                </motion.div>

                {/* Office Address Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white text-sm sm:text-base">Headquarters</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1 leading-relaxed">
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </motion.div>

                {/* Working Hours Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white text-sm sm:text-base">Working Hours</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                      Mon – Fri, 9:30 AM – 6:30 PM (IST)
                    </p>
                  </div>
                </motion.div>

                {/* Social Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white text-sm sm:text-base">LinkedIn Network</h4>
                    <a href="https://www.linkedin.com/company/techvistar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-400 font-semibold mt-1 hover:text-emerald-400 transition-colors">
                      <span>Connect with us</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* SLA Response Guarantee Panel */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 flex gap-4 items-start shadow-sm mt-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold font-display text-white text-sm sm:text-base mb-1">{CONTACT_SIDEBAR.slaTitle}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">{CONTACT_SIDEBAR.slaBody}</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Premium Glass Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
                
                {/* Visual Accent glow */}
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="border-b border-white/5 pb-6 mb-8">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <Mail className="w-5.5 h-5.5 text-emerald-400" />
                    <span>Send us a secure message</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-1.5">Fields marked * are required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FloatingInput 
                      id="name" 
                      label="Full name *" 
                      value={formData.name} 
                      onChange={(e) => handleInputChange('name', e.target.value)} 
                      required 
                    />
                    <FloatingInput 
                      id="email" 
                      label="Work email *" 
                      value={formData.email} 
                      type="email"
                      onChange={(e) => handleInputChange('email', e.target.value)} 
                      required 
                    />
                  </div>

                  <FloatingInput 
                    id="subject" 
                    label="Subject / reference *" 
                    value={formData.subject} 
                    onChange={(e) => handleInputChange('subject', e.target.value)} 
                    required 
                  />

                  <FloatingTextarea 
                    id="message" 
                    label="Requirements summary *" 
                    value={formData.message} 
                    onChange={(e) => handleInputChange('message', e.target.value)} 
                    required 
                    rows={6}
                  />

                  <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between pt-4">
                    <span className="text-xs text-slate-400 font-semibold">
                      SLA: Response guaranteed within 24 business hours.
                    </span>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-8 h-13 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/25 hover:scale-103 active:scale-97 disabled:opacity-50 shrink-0"
                    >
                      <span>{isSubmitting ? CONTACT_FORM.submittingText : CONTACT_FORM.submitButton}</span>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION: EMBEDDED MAP */}
        <section className="container-custom py-12 relative z-10 max-w-7xl mx-auto">
          <div className="border-b border-white/5 pb-4 mb-8">
            <h3 className="text-lg font-bold font-display text-white">Our Location</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Visit or reach out to our regional workspace coordinates.</p>
          </div>
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d243647.34203498877!2d78.26795904576391!3d17.412299801456108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2e75%3A0x33e6c382f6e9bc66!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1703664821665!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) opacity(0.8)" }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="TechVistar Hyderabad Coordinates"
            />
          </div>
        </section>

        {/* SECTION: FAQ SECTION */}
        <section className="container-custom py-12 relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400 font-semibold mt-2">Find quick answers regarding onboarding, compliance and SLAs.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
            {faqs.map((faq) => (
              <FAQAccordion key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* FOOTER CTA SECTION */}
        <section className="container-custom py-12 relative z-10 max-w-7xl mx-auto">
          <motion.div 
            whileHover={{ y: -3 }}
            className="rounded-3xl bg-gradient-to-br from-slate-900 to-zinc-950 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto relative z-10 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Ready to start a scope conversation?</h3>
              <p className="text-slate-400 font-semibold text-sm sm:text-base leading-relaxed">
                Connect with our engineering leads to outline timelines, compliance metrics, and technical requirements.
              </p>
              <div className="pt-2">
                <a 
                  href="mailto:support@techvistar.com"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:scale-104 active:scale-97 group"
                >
                  <span>Discuss statement of work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
