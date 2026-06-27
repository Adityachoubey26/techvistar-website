import { MapPin, Mail, Phone } from 'lucide-react';

export const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Office',
    details: 'Hyderabad, Telangana, India',
  },
  {
    icon: Mail,
    title: 'Business inquiries',
    details: 'support@techvistar.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+91 9573157982',
  },
] as const;

export const SECTION_CONTACT = {
  tag: 'Contact',
  title: 'Start a',
  highlight: 'growth conversation',
  description:
    'Share goals, timeline, budget band, and constraints. We reply with clarifying questions, a suggested approach, and—where appropriate—a proposal or statement of work aligned to measurable outcomes.',
} as const;

export const CONTACT_SIDEBAR = {
  title: 'Business & project inquiries',
  lead:
    'For RFPs, vendor onboarding, or kickoff, use the form. We route messages to the right practice lead within one business day.',
  slaTitle: 'First response',
  slaBody:
    'We acknowledge new business inquiries within one business day (IST). For urgent production issues from existing clients, please call and reference your engagement ID.',
} as const;
