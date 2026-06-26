import img1 from '../1.jpg';
import img2 from '../2.jpg';
import img3 from '../3.jpg';
import img4 from '../4.jpg';

export const PROJECTS = [
  {
    id: 1,
    title: 'Navigation & route optimization',
    description:
      'End-to-end planning workflow for multi-stop routes under time windows, capacity, and road constraints: geocoded inputs, solver-backed optimization (cost / time / distance objectives), and operator review before dispatch. Includes map visualisation, exception handling for failed legs, and auditable run history for operations.',
    image: img1,
    category: 'Mobility & logistics',
    technologies: ['Python', 'Maps APIs', 'OR tooling', 'React'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Eco_System — environmental intelligence',
    description:
      'Unified dashboard for environmental indicators and programme KPIs: ingestion from sensors and third-party feeds, role-based views for field vs management users, scheduled reports, and threshold-based alerts. Designed for traceability from raw readings to consolidated scores used in review meetings.',
    image: img2,
    category: 'Data & sustainability',
    technologies: ['APIs', 'PostgreSQL', 'ETL', 'Web'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Crop Hub — crop health screening',
    description:
      'Image-based workflow for leaf uploads, model inference, and structured reporting for field teams—designed for clarity of results and auditability of predictions.',
    image: img3,
    category: 'Applied ML',
    technologies: ['Python', 'TensorFlow', 'Flask', 'HTML/CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Sentiment classification service',
    description:
      'Text-in / label-out service for opinion mining with reproducible training features, evaluation metrics, and a lightweight operator UI for batch runs.',
    image: img4,
    category: 'NLP',
    technologies: ['Python', 'Streamlit', 'scikit-learn', 'TF-IDF'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Resume review assistant',
    description:
      'Guided scoring against role templates, ATS-oriented formatting checks, and actionable suggestions—keeping human review in the loop.',
    image: img3,
    category: 'Productivity AI',
    technologies: ['Python', 'Streamlit', 'AI/LLM'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Clinical risk scoring prototype',
    description:
      'Interpretable ML pipeline with calibrated outputs and confidence bands, focused on safe presentation of assistive—not diagnostic—information.',
    image: img4,
    category: 'Healthcare ML',
    technologies: ['Python', 'Flask', 'ML', 'HTML/CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 7,
    title: 'AI Translator',
    description:
      'Multilingual translation service with configurable engines (neural + optional LLM assist), customer glossary and “do-not-translate” lists, segment-level confidence, and a review queue for low-confidence spans. Exposes REST/WebSocket APIs for product embeds plus an operator console for batch runs.',
    image: img1,
    category: 'NLP / GenAI',
    technologies: ['Python', 'LLM APIs', 'FastAPI', 'React'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 8,
    title: 'AI Translator — documents & batches',
    description:
      'Long-form and high-volume translation pipeline: structured uploads (DOCX/PDF/HTML), layout-aware segmentation, translation memory reuse, and export that preserves headings, tables, and inline markup where feasible. Job queue with retries, per-file status, and downloadable artefacts for audit.',
    image: img2,
    category: 'NLP / GenAI',
    technologies: ['Workers', 'DOCX/PDF', 'TM', 'Python'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 9,
    title: 'Finance — reporting & analytics',
    description:
      'Role-based financial workspace: multi-entity P&L and balance views, period close checklists, drill-down to transactions, cashflow projections from configurable rules, and scheduled exports (CSV/PDF). Access logging and segregation of duties aligned to finance review—not just a single shared spreadsheet.',
    image: img3,
    category: 'FinTech',
    technologies: ['React', 'PostgreSQL', 'RBAC', 'Reporting'],
    liveUrl: '#',
    githubUrl: '#',
  },
] as const;

export const SECTION_PROJECTS = {
  tag: 'Case highlights',
  title: 'Representative work',
  highlight: 'across stacks',
  description:
      'Samples span routing, NLP/ML, finance, and internal tooling—illustrative of how we scope, integrate, and hand over production-minded software. Details anonymized where required.',
} as const;
