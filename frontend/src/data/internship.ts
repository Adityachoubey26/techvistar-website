/** 3-month program — aligned with public internship poster */
export const INTERNSHIP_MARQUEE_SEGMENTS = [
  'New batch open — 3-Month AI & Python Program',
  'Limited seats — register now',
  '1 hour daily training · Guest lectures · Certificate · Real-time projects',
  'Call +91 9573157982 · techvistar.com',
] as const;

export const INTERNSHIP_PROGRAM = {
  eyebrow: 'Professional program',
  title: '3-Month AI & Python',
  titleAccent: 'Program',
  subtitle:
    'A structured, twelve-week pathway from Python fundamentals through applied AI and generative systems—delivered with weekly learning outcomes, guided practice, and a capstone project suitable for your portfolio.',
  enrollingLabel: 'Now enrolling — new batch',
  curriculumLabel: 'Curriculum structure',
  syllabusLabel: 'Three-phase syllabus',
  progressionLabel: 'Week-by-week progression',
  weeklyFocusLabel: 'Weekly focus',
  highlightsLabel: 'Program highlights',
  audienceLabel: 'Who should apply',
  registerButtonText: 'Enquire & register',
  phaseLabel: 'Phase',
  ofLabel: 'of',
  summaryStats: [
    { label: 'Duration', value: '3 months' },
    { label: 'Curriculum', value: '12 weeks' },
    { label: 'Daily cadence', value: '~1 hour' },
    { label: 'Format', value: 'Live + projects' },
  ],
  phases: [
    {
      key: 'phase-1',
      monthLabel: 'Month 1',
      title: 'Python programming foundation',
      weeks: [
        { label: 'Week 1', detail: 'Python setup, variables, and data types' },
        { label: 'Week 2', detail: 'Input handling and operators' },
        { label: 'Week 3', detail: 'Control flow statements' },
        { label: 'Week 4', detail: 'Functions and parameters' },
      ],
    },
    {
      key: 'phase-2',
      monthLabel: 'Month 2',
      title: 'Advanced Python & object-oriented programming',
      weeks: [
        { label: 'Week 5', detail: 'Classes, methods, and modules' },
        { label: 'Week 6', detail: 'Object-oriented programming concepts' },
        { label: 'Week 7', detail: 'File handling and exception handling' },
        { label: 'Week 8', detail: 'Introduction to Artificial Intelligence' },
      ],
    },
    {
      key: 'phase-3',
      monthLabel: 'Month 3',
      title: 'Generative AI & final project',
      weeks: [
        { label: 'Week 9', detail: 'Large Language Models (LLMs) and RAG' },
        { label: 'Week 10', detail: 'Transformers, embeddings, and vector databases' },
        { label: 'Week 11', detail: 'Fine-tuning and prompt engineering' },
        { label: 'Week 12', detail: 'Final industry-level project development' },
      ],
    },
  ],
  highlights: [
    '1 hour daily structured training',
    'Guest lectures on alternate weeks',
    'Program certificate on completion',
    'Real-time project experience',
  ],
  audience: [
    'B.Tech / degree students',
    'Diploma students',
    'Final-year students',
    'Beginners interested in AI',
    'Job seekers switching to tech',
  ],
  cta: {
    urgent: 'Limited seats available — register now',
    phoneDisplay: '+91 9573157982',
    phoneTel: '+919573157982',
    website: 'https://www.techvistar.com',
    footnote: 'Internship certificate and portfolio-ready project guidance on successful completion.',
  },
} as const;
