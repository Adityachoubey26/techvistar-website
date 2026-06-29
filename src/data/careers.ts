export interface Career {
  id: string;
  slug: string;
  title: string;
  department: 'Engineering' | 'Design' | 'Marketing' | 'Operations' | 'Other';
  employmentType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  location: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
  applyUrl: string;
}

export const CAREERS: readonly Career[] = [
  {
    id: '1',
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    employmentType: 'Full-Time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '2-4 Years',
    description: 'We are looking for a skilled Frontend Developer to build clean, responsive, and performance-oriented interfaces using React and TypeScript.',
    responsibilities: [
      'Translate designs and wireframes into high-quality code',
      'Optimize web pages for maximum speed, accessibility, and responsiveness',
      'Build reusable components and maintain frontend style guides',
      'Collaborate with backend engineers to integrate REST and GraphQL APIs'
    ],
    requirements: [
      'Strong proficiency in React, TypeScript, and TailwindCSS',
      'Solid understanding of state management (Zustand, Redux, or context APIs)',
      'Experience with modern build tools like Vite and webpack',
      'Familiarity with version control systems (Git/GitHub)'
    ],
    benefits: [
      'Competitive salary packages',
      'Hybrid/flexible working structures',
      'Continuous learning and certification support'
    ],
    status: 'active',
    featured: true,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20Frontend%20Developer'
  },
  {
    id: '2',
    slug: 'backend-developer',
    title: 'Backend Developer',
    department: 'Engineering',
    employmentType: 'Full-Time',
    location: 'Remote (Worldwide)',
    experience: '3+ Years',
    description: 'Join our team as a Backend Developer to engineer robust server-side architectures, handle databases, and build scalable APIs.',
    responsibilities: [
      'Design and implement secure RESTful and WebSocket APIs',
      'Normalize and maintain relational databases (PostgreSQL/MySQL)',
      'Optimize server architectures for scalability and lower latencies',
      'Configure server pipelines, Docker files, and server logging infrastructure'
    ],
    requirements: [
      'Excellent proficiency in Node.js, Express, or NestJS',
      'Strong database modeling skills using PostgreSQL or MongoDB',
      'Experience with Docker containerization and cloud setups (AWS/Azure)',
      'Knowledge of backend testing suites (Jest, Mocha)'
    ],
    benefits: [
      'Fully remote environment options',
      'Flexible working schedules',
      'Annual technology stipend'
    ],
    status: 'active',
    featured: true,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20Backend%20Developer'
  },
  {
    id: '3',
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    employmentType: 'Full-Time',
    location: 'Hyderabad, India (Hybrid)',
    experience: '2-4 Years',
    description: 'We are seeking a UI/UX Designer who is passionate about creating intuitive user flows, visual systems, and tactile prototypes.',
    responsibilities: [
      'Conduct user research, interviews, and structure user flows',
      'Build wireframes, interactive prototypes, and layout mockups',
      'Maintain and expand TechVistar\'s design system library in Figma',
      'Work alongside engineering teams to ensure pixel-perfect visual styling'
    ],
    requirements: [
      'Advanced skills in Figma and visual asset editors',
      'Strong portfolio displaying mobile app and web portal designs',
      'Good understanding of user-centered design and web accessibility principles',
      'Excellent communication and collaboration skills'
    ],
    benefits: [
      'Creative freedom and ownership over project designs',
      'Figma and tool subscriptions fully covered',
      'Mentorship from senior design directors'
    ],
    status: 'active',
    featured: true,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20UI/UX%20Designer'
  },
  {
    id: '4',
    slug: 'react-intern',
    title: 'React Intern',
    department: 'Engineering',
    employmentType: 'Internship',
    location: 'Hyderabad, India (Office)',
    experience: 'Fresher / Entry',
    description: 'Kickstart your web development career! Learn to write production-grade frontend code under the guidance of senior mentors.',
    responsibilities: [
      'Assist in converting static HTML/CSS files into React components',
      'Fix interface bugs and style inconsistencies across platforms',
      'Participate in daily code reviews and team alignment meetings',
      'Document frontend component structures and APIs'
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, JavaScript, and ES6 concepts',
      'Familiarity with React basics (components, props, state, hooks)',
      'Strong willingness to learn and accept constructive feedback',
      'Basic knowledge of Git version control'
    ],
    benefits: [
      'Stipend and certificate of internship',
      '1-on-1 mentorship sessions',
      'Opportunity for conversion to a full-time role'
    ],
    status: 'active',
    featured: false,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20React%20Internship'
  },
  {
    id: '5',
    slug: 'full-stack-intern',
    title: 'Full Stack Intern',
    department: 'Engineering',
    employmentType: 'Internship',
    location: 'Hyderabad, India (Office)',
    experience: 'Fresher / Entry',
    description: 'Gain hands-on full stack engineering experience by building web modules, maintaining databases, and scripting APIs.',
    responsibilities: [
      'Support full-stack feature development under sprint schedules',
      'Write database queries and assist in api route engineering',
      'Participate in backend testing and API integration validation',
      'Learn deployment pipelines and cloud infrastructure configurations'
    ],
    requirements: [
      'Foundational understanding of JavaScript, React, and Node.js',
      'Basic knowledge of SQL/NoSQL databases',
      'Eager to learn full-stack principles and software architectures',
      'Active student or recent graduate in Computer Science or similar'
    ],
    benefits: [
      'Paid monthly stipend and completion certificate',
      'Practical exposure to production repositories',
      'Flexible study-exam leave options'
    ],
    status: 'active',
    featured: false,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20Full%20Stack%20Internship'
  },
  {
    id: '6',
    slug: 'marketing-intern',
    title: 'Marketing Intern',
    department: 'Marketing',
    employmentType: 'Internship',
    location: 'Remote / Hybrid',
    experience: 'Fresher / Entry',
    description: 'Help TechVistar grow its audience by creating social content, setting up search campaigns, and drafting marketing materials.',
    responsibilities: [
      'Assist in managing and drafting posts for company social channels',
      'Support email marketing setups and newsletter compilation',
      'Research keywords and audit baseline SEO metadata',
      'Compile weekly tracking statistics for marketing review logs'
    ],
    requirements: [
      'Strong written communication skills in English',
      'Basic understanding of social media platforms (LinkedIn, Twitter)',
      'Eager to learn digital advertising, SEO, and analytics tools',
      'Creative mindset with attention to detail'
    ],
    benefits: [
      'Practical training in digital marketing tools (Google Ads, Semrush)',
      'Internship certificate and performance stipend',
      'Collaborative startup culture'
    ],
    status: 'active',
    featured: false,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20Marketing%20Internship'
  },
  {
    id: '7',
    slug: 'campus-ambassador',
    title: 'Campus Ambassador',
    department: 'Other',
    employmentType: 'Internship',
    location: 'Campus-Based',
    experience: 'Student',
    description: 'Represent TechVistar on your college campus! Promote our training programs, coordinate guest lectures, and drive student registrations.',
    responsibilities: [
      'Promote TechVistar programs and workshops across campus channels',
      'Serve as the primary liaison between your college and TechVistar team',
      'Coordinate with college authorities to organize seminar presentations',
      'Help fellow students sign up for internships and webinars'
    ],
    requirements: [
      'Active student pursuing an undergraduate degree (B.Tech, BCA, BSc, etc.)',
      'Strong communication, leadership, and public speaking skills',
      'Active participation in college clubs or student unions is a plus',
      'Passionate about networking and connecting students to career tools'
    ],
    benefits: [
      'Certificate of Excellence and letter of recommendation',
      'Performance-based cash rewards and referral bonuses',
      'Free access to TechVistar specialized training modules'
    ],
    status: 'active',
    featured: false,
    applyUrl: 'mailto:careers@techvistar.com?subject=Application%20for%20Campus%20Ambassador'
  }
];

export const CAREERS_PAGE_DATA = {
  hero: {
    title: 'Careers at TechVistar',
    subtitle: 'Shape the Future of Technology',
    description: 'Build innovative digital products, solve complex database and cloud challenges, and accelerate your engineering or design career with a team that values structure, documentation, and growth.'
  },
  whyJoin: [
    { title: 'Mentorship Culture', description: 'Work alongside senior architects who actively guide you through industry best practices and clean coding conventions.' },
    { title: 'Real Responsibility', description: 'No coffee runs. Interns and junior developers write code and designs that ship to production environments.' },
    { title: 'Modern Tech Stacks', description: 'Work with the latest frontend frameworks, AI agents, cloud container tools, and database systems.' }
  ],
  benefits: [
    { title: 'Flexible Schedule', description: 'Hybrid and remote setups built around outputs, not clock-in stamps.' },
    { title: 'Stipends & Rewards', description: 'Competitive stipends, performance-based conversion bonuses, and referral perks.' },
    { title: 'Learning Allowance', description: 'Access to premium study materials, software subscriptions, and developer tools.' },
    { title: 'Career Acceleration', description: 'Structured paths from internships to associate, mid, and lead engineering coordinates.' }
  ],
  hiringProcess: [
    { step: 1, title: 'Apply Online', description: 'Send your portfolio, CV, or campus credentials directly to our team.' },
    { step: 2, title: 'Technical Screening', description: 'A short call to discuss your projects, interest, and tech stack compatibility.' },
    { step: 3, title: 'Practical Assessment', description: 'Solve a small, realistic code or design test to evaluate your execution.' },
    { step: 4, title: 'Technical Interview', description: 'Deep dive into your assessment file with our engineering leads.' },
    { step: 5, title: 'Offer Letter', description: 'Onboard under clear terms, mentor alignment, and launch date settings.' }
  ],
  faqs: [
    { question: 'What is the duration of the internship programs?', answer: 'Our standard internships run for 3 months, with monthly progress reviews and performance evaluations.' },
    { question: 'Is there a possibility of full-time conversion?', answer: 'Yes, outstanding performance during the internship frequently leads to full-time junior associate engineering or design offers.' },
    { question: 'Are remote options available for interns?', answer: 'Most internship roles require presence at our Hyderabad office to maximize 1-on-1 mentorship, but hybrid/remote options are reviewed case-by-case.' }
  ],
  applyCTA: {
    title: 'Don\'t see a matching opening?',
    description: 'We are always looking for passionate engineers, visual designers, and content writers. Drop your details, and we\'ll contact you for future cohorts.',
    buttonText: 'Submit Open Application',
    emailUrl: 'mailto:careers@techvistar.com?subject=General%20Open%20Application'
  }
};
