import { CAREERS, CAREERS_PAGE_DATA, Career } from '@/data/careers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Briefcase, MapPin, Calendar, Clock, GraduationCap } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { FAQSection } from '@/components/faq';

const Careers = () => {
  // Filter full-time vs internship positions
  const activeCareers = CAREERS.filter((c) => c.status === 'active');
  const fullTimePositions = activeCareers.filter((c) => c.employmentType === 'Full-Time');
  const internshipPositions = activeCareers.filter((c) => c.employmentType === 'Internship');

  const { hero, whyJoin, benefits, hiringProcess, applyCTA } = CAREERS_PAGE_DATA;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-slate-50">
        <Navbar />

        {/* 1. Hero Section */}
        <section className="pt-32 pb-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/15 font-medium mb-3">
              {hero.subtitle}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
              {hero.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>
          </div>
        </section>

        <Breadcrumb />

        {/* 2. Why Join Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-10 text-center">
              Why Join TechVistar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyJoin.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Open Positions (Full-Time) */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Open Positions (Full-Time)
              </h2>
            </div>

            {fullTimePositions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fullTimePositions.map((job) => (
                  <Card key={job.id} className="border-slate-200 hover:border-primary/20 hover:shadow-md transition-all flex flex-col bg-white">
                    <CardHeader className="p-5 pb-3">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-none font-medium text-[10px]">
                          {job.department}
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          {job.experience}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        {job.title}
                      </CardTitle>
                      <div className="flex gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.employmentType}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex-grow flex flex-col justify-between">
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {job.description}
                      </p>
                      <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold mt-auto">
                        <a href={job.applyUrl}>Apply Now</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 border border-slate-100 p-6 rounded-lg text-center">
                No active full-time positions available. Check back soon or submit an open application below.
              </p>
            )}
          </div>
        </section>

        {/* 4. Internship Opportunities */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Internship Opportunities
              </h2>
            </div>

            {internshipPositions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {internshipPositions.map((job) => (
                  <Card key={job.id} className="border-slate-200 hover:border-primary/20 hover:shadow-md transition-all flex flex-col bg-white">
                    <CardHeader className="p-5 pb-3">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <Badge className="bg-emerald-550/10 text-emerald-650 hover:bg-emerald-550/15 border-none font-medium text-[10px]">
                          {job.department}
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          {job.experience}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        {job.title}
                      </CardTitle>
                      <div className="flex gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.employmentType}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex-grow flex flex-col justify-between">
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {job.description}
                      </p>
                      <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold mt-auto">
                        <a href={job.applyUrl}>Apply Now</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 bg-white border border-slate-200 p-6 rounded-lg text-center">
                No active internship positions available at this time.
              </p>
            )}
          </div>
        </section>

        {/* 5. Company Benefits */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-10 text-center">
              TechVistar Benefits & Perks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Hiring Process */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-10 text-center">
              Our Hiring Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 md:before:hidden">
              {hiringProcess.map((step) => (
                <div key={step.step} className="bg-white border border-slate-200 rounded-xl p-5 relative flex gap-4 md:flex-col md:gap-0">
                  <div className="h-8 w-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mb-3 border-4 border-white shadow-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1 md:mt-2">{step.title}</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQs Section replaced with unified FAQSection */}
        <FAQSection pageFilter="careers" title="Careers FAQ" description="Have questions about our interview cycles, hiring timelines, and workplace culture?" />

        {/* 8. Apply CTA Banner */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 text-white text-center shadow-md">
              <h2 className="text-xl md:text-2xl font-bold font-display mb-3">
                {applyCTA.title}
              </h2>
              <p className="text-white/80 text-xs md:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                {applyCTA.description}
              </p>
              <Button asChild className="bg-white text-primary hover:bg-slate-50 font-bold border-none shadow-none px-6 py-2.5 rounded-lg">
                <a href={applyCTA.emailUrl}>{applyCTA.buttonText}</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Careers;
