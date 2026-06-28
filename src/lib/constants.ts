/** Site-wide identity (used in copy + JSON-LD) */
export const SITE = {
  name: 'TechVistar',
  url: 'https://techvistar.com',
  description:
    'TechVistar is a technology-first growth partner: web systems, brand and digital presence, marketing instrumentation, automation, AI, and documentation—delivered with structured scope, measurable outcomes, and handover your team can operate.',
  address: {
    locality: 'Hyderabad',
    region: 'Telangana',
    countryCode: 'IN',
    countryName: 'India',
  },
  socials: [
    'https://www.linkedin.com/company/techvistar',
    'https://www.instagram.com/tech_vistar',
  ],
} as const;

// Navigation — About is a dedicated route; other anchors target home sections via /#…
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const NAVBAR_REGISTER_FORM = {
  actionUrl: 'https://script.google.com/macros/s/AKfycbyVFalUML0Mnb-S2RuoCA68d5422p5MvMWF_id4Uw-MIQyiH5PxiglxPGdHDV47QJ22/exec',
  headerButtonText: 'Register now',
  dialog: {
    title: 'Register now',
    description: 'Share your details and our team will connect with you about the next batch.',
    fields: {
      name: {
        label: 'Full name',
        placeholder: 'Your full name',
      },
      email: {
        label: 'Email ID',
        placeholder: 'name@example.com',
      },
      phone: {
        label: 'Number',
        placeholder: '+91 9876543210',
      },
    },
    submitButton: 'Submit',
    submittingText: 'Submitting…',
  },
  toasts: {
    success: {
      title: 'Registration submitted',
      description: 'Thank you. Our team will contact you shortly.',
    },
    error: {
      title: 'Submission failed',
      description: 'Unable to submit now. Please try again shortly.',
    },
  },
} as const;
