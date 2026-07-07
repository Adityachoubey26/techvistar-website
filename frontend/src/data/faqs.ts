export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Work' | 'Careers' | 'Contact' | 'AI' | 'Backend' | 'Frontend';
  page: 'home' | 'services' | 'work' | 'careers' | 'contact' | 'all';
  tags: string[];
  featured: boolean;
}

export const FAQs: readonly FAQ[] = [
  {
    id: 'faq-methodology',
    category: 'General',
    page: 'home',
    tags: ['methodology', 'process'],
    featured: true,
    question: "What is TechVistar's delivery methodology?",
    answer: 'We use an iterative, milestone-driven delivery process. It begins with aligning on vision, locking in the scope, executing clean development sprints with regular demos, and finalizing with production launch and handover training.'
  },
  {
    id: 'faq-codebase',
    category: 'General',
    page: 'home',
    tags: ['codebase', 'ownership'],
    featured: true,
    question: 'Will our internal team own the codebase after delivery?',
    answer: 'Yes. Upon project completion and sign-off, you receive full intellectual property rights, the complete codebase, and comprehensive documentation so your internal team can fully own and maintain the system.'
  },
  {
    id: 'faq-1',
    category: 'General',
    page: 'home',
    tags: ['company', 'services'],
    featured: true,
    question: 'What services does TechVistar offer?',
    answer: 'We offer end-to-end digital solutions including Web & Mobile Development, AI Solutions, Cloud & DevOps, UI/UX Design, Automation, Data Analytics, and Product Engineering.'
  },
  {
    id: 'faq-2',
    category: 'General',
    page: 'home',
    tags: ['quality', 'qa'],
    featured: true,
    question: 'How do you ensure the quality of your work?',
    answer: 'We ensure high standards by executing thorough unit testing, continuous integration checks, peer code reviews, and staging environment verification before release.'
  },
  {
    id: 'faq-3',
    category: 'General',
    page: 'home',
    tags: ['process', 'milestones'],
    featured: true,
    question: 'What is your typical project development process?',
    answer: 'Our process follows a four-phase VISTAR methodology: align on vision and insight, lock detailed scope and milestones, execute clean iteration sprints, and complete production launch training.'
  },
  {
    id: 'faq-4',
    category: 'General',
    page: 'home',
    tags: ['startups', 'clients'],
    featured: true,
    question: 'Do you work with startups and small businesses?',
    answer: 'Yes, we build scalable software matching the budgets and timeline velocities of early-stage startups and small businesses, enabling rapid feature launches.'
  },
  {
    id: 'faq-5',
    category: 'General',
    page: 'services',
    tags: ['timeline', 'duration'],
    featured: true,
    question: 'How long does a typical project take?',
    answer: 'Depending on complexity, small MVP builds take 4 to 8 weeks, while comprehensive enterprise systems and digital transformations range from 3 to 6 months.'
  },
  {
    id: 'faq-6',
    category: 'General',
    page: 'services',
    tags: ['technologies', 'stack'],
    featured: true,
    question: 'What technologies do you use?',
    answer: 'We use React, Next.js, TypeScript, TailwindCSS for frontend; Node.js, Go, Python for backend; AWS, Azure, Docker, Kubernetes for cloud operations.'
  },
  {
    id: 'faq-7',
    category: 'Backend',
    page: 'services',
    tags: ['cloud', 'backend'],
    featured: false,
    question: 'How do you handle backend scaling and security?',
    answer: 'We construct server frameworks utilizing Node.js, Go, or Python, deployed in containerized Docker environments on AWS/Azure. We manage infrastructures via Terraform, implementing auto-scaling policies, CDN caching, and encrypted database networks.'
  },
  {
    id: 'faq-8',
    category: 'Frontend',
    page: 'services',
    tags: ['performance', 'seo'],
    featured: false,
    question: 'Are your designs and web layouts fully optimized for SEO?',
    answer: 'Yes, we optimize every application to score 90+ on Google Lighthouse/Core Web Vitals. We implement server-side rendering (SSR), optimized responsive images, clean semantics, meta configurations, and microdata parameters.'
  },
  {
    id: 'faq-9',
    category: 'Services',
    page: 'services',
    tags: ['devops', 'deployment'],
    featured: false,
    question: 'How do you manage deployments and CI/CD operations?',
    answer: 'We configure automated CI/CD pipelines (e.g. GitHub Actions or GitLab CI) that trigger automated linting, unit tests, and build processes before deploying directly to staging or production.'
  }
, // appended
  {
    id: 'extracted-faq-0',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What is your technology handover model?",
    answer: "Upon project completion, we hand over full code ownership, version history, documentation, and cloud access keys."
  },
  {
    id: 'extracted-faq-1',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do you guarantee project delivery timelines?",
    answer: "We employ two-week Agile sprints, providing transparent task tracking dashboards, weekly reviews, and clear milestone schedules."
  },
  {
    id: 'extracted-faq-2',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you offer ongoing production maintenance?",
    answer: "Yes. We provide structured SLA tiers covering server health checks, dependency upgrades, security patching, and scaling."
  },
  {
    id: 'extracted-faq-3',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What CMS platforms do you support?",
    answer: "We build custom CMS structures and integrate standard headless architectures like Strapi, Sanity, or WordPress APIs based on your workflow."
  },
  {
    id: 'extracted-faq-4',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Are the websites responsive?",
    answer: "Yes, every site we deploy is optimized for smartphones, tablets, laptops, and wide desktop displays."
  },
  {
    id: 'extracted-faq-5',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you help with App Store approvals?",
    answer: "Yes, we handle the entire submission process, including metadata configuration, privacy policy mapping, and review guidelines."
  },
  {
    id: 'extracted-faq-6',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will I get editable design files?",
    answer: "Yes, we provide full access to Figma source files, complete with components, variables, styles, and prototypes."
  },
  {
    id: 'extracted-faq-7',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do you prevent AI hallucinations?",
    answer: "We implement Retrieval-Augmented Generation (RAG) to restrict model contexts to verified internal documentation and apply strict content filters."
  },
  {
    id: 'extracted-faq-8',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do we manage API token costs and usage limits?",
    answer: "We build semantic caching layers to reuse response structures, throttle heavy consumer requests, and route lighter queries to open-source models like Llama 3."
  },
  {
    id: 'extracted-faq-9',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will our proprietary business data be used to train public LLMs?",
    answer: "No. We configure private cloud instances (AWS/Azure VPC) and strictly utilize zero-data retention enterprise API contracts so your data remains entirely confidential."
  },
  {
    id: 'extracted-faq-10',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can your AI workflows connect to our legacy internal systems?",
    answer: "Yes. We construct custom webhooks, secure REST API bridges, and database synchronization pipelines to connect legacy platforms with modern orchestration frameworks."
  },
  {
    id: 'extracted-faq-11',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will there be any downtime during migration?",
    answer: "We utilize side-by-side environments and real-time database replication to ensure your users experience absolutely zero service interruptions."
  },
  {
    id: 'extracted-faq-12',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What CI/CD platforms do you work with?",
    answer: "We typically build integrations inside GitHub Actions, GitLab CI, or local Jenkins installations depending on codebase locations."
  },
  {
    id: 'extracted-faq-13',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you host models locally or use third-party APIs?",
    answer: "We support both. We configure private cloud hosting for maximum control or use secure enterprise contracts with API providers."
  },
  {
    id: 'extracted-faq-14',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What happens if an API is temporarily down?",
    answer: "We implement automatic backoff retry queues and instant notifications on Slack/Discord to ensure no event is lost."
  },
  {
    id: 'extracted-faq-15',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What is included in the brand style guide?",
    answer: "It defines your primary/secondary logomark rules, typography hierarchies, exact color formulas, and asset templates."
  },
  {
    id: 'extracted-faq-16',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What file formats do you deliver for animation?",
    answer: "We deliver in MP4, WebM, and Lottie (JSON) format for web micro-animations."
  },
  {
    id: 'extracted-faq-17',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What is the main difference between Product Design and UI/UX?",
    answer: "Product Design focuses on business goals, features, and overall validation, while UI/UX targets the specific visual layouts and user pathways."
  },
  {
    id: 'extracted-faq-18',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you work with custom databases?",
    answer: "Yes, we routinely build API wrappers and sync systems to connect custom legacy databases with modern SaaS platforms."
  },
  {
    id: 'extracted-faq-19',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do you handle multi-tenancy?",
    answer: "We typically use logical separation with a shared database and tenant columns, or physical schema separation depending on your compliance requirements."
  },
  {
    id: 'extracted-faq-20',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will our data be kept confidential?",
    answer: "Yes, we use enterprise API agreements or self-hosted models ensuring no company files are ever logged or used to train public datasets."
  },
  {
    id: 'extracted-faq-21',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do you handle heavy background tasks?",
    answer: "We offload them from the main API thread using message queues like BullMQ or RabbitMQ to ensure the user interface remains responsive."
  },
  {
    id: 'extracted-faq-22',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Why is page speed important for conversion?",
    answer: "A 1-second delay in page load time can reduce conversions by up to 20% on mobile devices."
  },
  {
    id: 'extracted-faq-23',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you help write internal software specifications?",
    answer: "Yes, we assist product managers in scoping SOW requirements and defining database entities before coding begins."
  },
  {
    id: 'extracted-faq-24',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "When will I see search engine updates?",
    answer: "Organic SEO optimization changes typically take 3 to 6 months to register on major search indexes, while paid ads generate clicks immediately."
  },
  {
    id: 'extracted-faq-25',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What compliance frameworks do you support?",
    answer: "We build infrastructures aligned with SOC2, ISO27001, and HIPAA compliance requirements."
  },
  {
    id: 'extracted-faq-26',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you help write security policies?",
    answer: "Yes, we assist engineering teams in structuring SOW security parameters and IAM policies."
  },
  {
    id: 'extracted-faq-27',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How long does a migration take?",
    answer: "Depending on complexity, typical migrations take 6 to 12 weeks with zero service disruption."
  },
  {
    id: 'extracted-faq-28',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you offer ongoing SLAs?",
    answer: "Yes, we provide structured 24/7 telemetry monitoring and platform updates."
  },
  {
    id: 'extracted-faq-29',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can this integrate with our legacy databases?",
    answer: "Yes, we specialize in building custom API connectors to sync with existing data setups."
  },
  {
    id: 'extracted-faq-30',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Is it mobile-friendly?",
    answer: "Absolutely, the platform includes a fully responsive design for agents on the move."
  },
  {
    id: 'extracted-faq-31',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How do you handle migration from SAP or oracle?",
    answer: "We build secure migration pipelines to extract, clean, and sync schemas with minimum operational risk."
  },
  {
    id: 'extracted-faq-32',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Is multi-currency supported?",
    answer: "Yes, our accounting engine supports localized tax rules and multi-currency updates."
  },
  {
    id: 'extracted-faq-33',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you use tools like Zapier or code it custom?",
    answer: "While we can connect to integrations like Zapier, we build custom node functions for maximum reliability and lower running costs."
  },
  {
    id: 'extracted-faq-34',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How are errors handled?",
    answer: "Our systems feature auto-retry limits and send detailed slack notifications if an action fails."
  },
  {
    id: 'extracted-faq-35',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will the bot make up fake answers?",
    answer: "We restrict the bot to ONLY answer from your provided documents, returning a \"I don\\'t know\" response instead of hallucinating."
  },
  {
    id: 'extracted-faq-36',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How often can we update the documentation?",
    answer: "Our automated pipelines re-sync and update the vector base within minutes of document modifications."
  },
  {
    id: 'extracted-faq-37',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What safeguards prevent the agent from getting stuck?",
    answer: "We program max-step thresholds and loop detection limits to safely abort and escalate stuck threads."
  },
  {
    id: 'extracted-faq-38',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can the agent make real financial transactions?",
    answer: "Yes, within restricted limits and with mandatory multi-party approvals for high-value operations."
  },
  {
    id: 'extracted-faq-39',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Is our corporate data safe?",
    answer: "Absolutely, all model training is done within your private cloud environment; your data is never sent to public OpenAI/Google servers."
  },
  {
    id: 'extracted-faq-40',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can we generate charts?",
    answer: "Yes, our pipelines can output structured JSON data mapped directly to rendering libraries."
  },
  {
    id: 'extracted-faq-41',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How does it handle low-quality scans?",
    answer: "Our pre-processing algorithms clean, straighten, and sharpen images before parsing to maximize OCR accuracy."
  },
  {
    id: 'extracted-faq-42',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can it run offline?",
    answer: "Yes, we can deploy open-source models directly onto your internal local servers."
  },
  {
    id: 'extracted-faq-43',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Will our application experience downtime during migration?",
    answer: "No, we keep systems synced live, switching DNS only when database integrity is fully verified."
  },
  {
    id: 'extracted-faq-44',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Do you configure monitoring dashboards?",
    answer: "Yes, we set up full Grafana or CloudWatch alert dashboards."
  },
  {
    id: 'extracted-faq-45',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can you build custom API endpoints for legacy software?",
    answer: "Yes, we specialize in building custom adapters to expose secure REST APIs for older platforms."
  },
  {
    id: 'extracted-faq-46',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How is security handled?",
    answer: "We use OAuth2 frameworks, API keys, and IP whitelisting to secure endpoints."
  },
  {
    id: 'extracted-faq-47',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Is there a limit on databases we can connect?",
    answer: "No, we build pipelines to pool details from multiple SQL/NoSQL databases and APIs."
  },
  {
    id: 'extracted-faq-48',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Can we configure automated email reports?",
    answer: "Yes, we can schedule dashboards to email PDF digests daily or weekly."
  },
  {
    id: 'extracted-faq-49',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "How often are security scans run?",
    answer: "Our CI/CD pipelines run code dependency scans on every commit, and host scans execute daily."
  },
  {
    id: 'extracted-faq-50',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "What is the duration of the internship programs?",
    answer: "Our standard internships run for 3 months, with monthly progress reviews and performance evaluations."
  },
  {
    id: 'extracted-faq-51',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Is there a possibility of full-time conversion?",
    answer: "Yes, outstanding performance during the internship frequently leads to full-time junior associate engineering or design offers."
  },
  {
    id: 'extracted-faq-52',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: "Are remote options available for interns?",
    answer: "Most internship roles require presence at our Hyderabad office to maximize 1-on-1 mentorship, but hybrid/remote options are reviewed case-by-case."
  }
];
