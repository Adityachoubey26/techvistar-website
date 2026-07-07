import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getActiveJobs, Job } from '@/services/job.service';
import { CAREERS_PAGE_DATA } from '@/data/careers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Briefcase, MapPin, Calendar, Clock, GraduationCap, Users, Cpu } from 'lucide-react';
import { WhyChooseUsSection } from '@/components/services/WhyChooseUsSection';
import { PageHeader } from '@/components/ui/PageHeader';

import careersBg from '../assets/careers-bg.png';
import frontendImg from '../assets/mobile_phone_devloper.png';
import backendImg from '../assets/Claud_Devops.png';
import designImg from '../assets/ui_ux_designer.png';
import reactInternImg from '../assets/overview_web_dev.png';
import fullStackInternImg from '../assets/custom_software_devlopment.png';
import marketingInternImg from '../assets/digital_marketing.png';
import campusAmbassadorImg from '../assets/brand_and_creative_design.png';

const jobImages: Record<string, string> = {
  'frontend-developer': frontendImg,
  'backend-developer': backendImg,
  'ui-ux-designer': designImg,
  'react-intern': reactInternImg,
  'full-stack-intern': fullStackInternImg,
  'marketing-intern': marketingInternImg,
  'campus-ambassador': campusAmbassadorImg,
};

const Careers = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const { data: jobs, isLoading, error, refetch } = useQuery<Job[]>({
    queryKey: ['activeJobs'],
    queryFn: getActiveJobs,
  });

  // Filter full-time vs internship positions
  const activeCareers = jobs || [];
  const fullTimePositions = activeCareers.filter(
    (c) => c.employmentType.toLowerCase() === 'full-time'
  );
  const internshipPositions = activeCareers.filter(
    (c) => c.employmentType.toLowerCase() === 'internship'
  );

  const { hero, whyJoin, benefits, hiringProcess, applyCTA } = CAREERS_PAGE_DATA;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-slate-50">
        <Navbar />

        {/* 1. Hero Section */}
        <PageHeader 
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          backgroundImage={careersBg}
        />

                {/* 2. Why Join Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <WhyChooseUsSection items={whyJoin} title="Why Join TechVistar?" />
          </div>
        </section>

        {/* 3. Open Positions */}
        {isLoading ? (
          <section className="py-16 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Loading Open Positions...
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="border-slate-200 flex flex-col bg-white overflow-hidden animate-pulse">
                    <div className="h-44 bg-slate-100 border-b border-slate-100 flex items-center justify-center p-3" />
                    <CardHeader className="p-5 pb-3">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="h-4 w-16 bg-slate-150 rounded" />
                        <div className="h-3.5 w-12 bg-slate-150 rounded" />
                      </div>
                      <div className="h-5 w-4/5 bg-slate-200 rounded mt-1" />
                      <div className="flex gap-4 mt-3">
                        <div className="h-3 w-16 bg-slate-150 rounded" />
                        <div className="h-3 w-16 bg-slate-150 rounded" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex-grow flex flex-col">
                      <div className="h-3 w-full bg-slate-150 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-slate-150 rounded mb-6" />
                      <div className="h-9 w-full bg-slate-200 rounded mt-auto" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : error ? (
          <section className="py-16 bg-white border-t border-slate-200 text-center">
            <div className="container mx-auto px-4 max-w-md">
              <p className="text-base text-red-500 font-semibold mb-3">
                Failed to load job listings.
              </p>
              <p className="text-xs text-slate-500 mb-6">
                Please check your network connection and try again.
              </p>
              <Button onClick={() => refetch()} className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-6">
                Retry Connection
              </Button>
            </div>
          </section>
        ) : activeCareers.length === 0 ? (
          <section className="py-16 bg-white border-t border-slate-200 text-center">
            <div className="container mx-auto px-4 max-w-lg">
              <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No openings available currently.</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                We don't have any active open positions right now. Please submit an open application below or check back soon!
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* 3a. Open Positions (Full-Time) */}
            <section className="py-16 bg-white border-t border-slate-200">
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center gap-3 mb-8">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold font-display text-slate-900">
                    Open Positions (Full-Time)
                  </h2>
                </div>

                {fullTimePositions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {fullTimePositions.map((job) => (
                      <Card key={job._id} className="border-slate-200 hover:border-primary/20 hover:shadow-md transition-all flex flex-col bg-white overflow-hidden">
                        {jobImages[job.slug] && (
                          <div className="h-44 overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center relative p-3">
                            <img 
                              src={jobImages[job.slug]} 
                              alt={job.title} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
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
                            <Link to={`/careers/${job.slug}`}>Apply Now / View Details</Link>
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {internshipPositions.map((job, idx) => {
                      const colors = [
                        'bg-emerald-50/40 border-emerald-200/60',
                        'bg-blue-50/40 border-blue-200/60',
                        'bg-amber-50/40 border-amber-200/60',
                        'bg-indigo-50/40 border-indigo-200/60'
                      ];
                      const colorClass = colors[idx % colors.length];
                      return (
                        <Card key={job._id} className={`hover:shadow-md transition-all flex flex-col ${colorClass} overflow-hidden`}>
                          {jobImages[job.slug] && (
                            <div className="h-44 overflow-hidden bg-white/30 border-b border-slate-200/40 flex items-center justify-center relative p-3">
                              <img 
                                src={jobImages[job.slug]} 
                                alt={job.title} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
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
                              <Link to={`/careers/${job.slug}`}>Apply Now / View Details</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 bg-white border border-slate-200 p-6 rounded-lg text-center">
                    No active internship positions available at this time.
                  </p>
                )}
              </div>
            </section>
          </>
        )}

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
              {hiringProcess.map((step, idx) => {
                const stepStyles = [
                  { badge: 'bg-emerald-500', card: 'bg-emerald-50/30 border-slate-200' },
                  { badge: 'bg-blue-500', card: 'bg-blue-50/30 border-slate-200' },
                  { badge: 'bg-indigo-500', card: 'bg-indigo-50/30 border-slate-200' },
                  { badge: 'bg-amber-500', card: 'bg-amber-50/30 border-slate-200' },
                  { badge: 'bg-rose-500', card: 'bg-rose-50/30 border-slate-200' }
                ];
                const currentStyle = stepStyles[idx % stepStyles.length];
                return (
                  <div key={step.step} className={`border rounded-xl p-5 relative flex gap-4 md:flex-col md:gap-0 transition-all ${currentStyle.card}`}>
                    <div className={`h-8 w-8 rounded-full ${currentStyle.badge} text-white text-xs font-bold flex items-center justify-center shrink-0 mb-3 border-4 border-white shadow-sm`}>
                      {step.step}
                    </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1 md:mt-2">{step.title}</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </section>



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
