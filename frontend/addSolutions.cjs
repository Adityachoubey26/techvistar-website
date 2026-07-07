const fs = require('fs');
const seed = JSON.parse(fs.readFileSync('seed.json', 'utf8'));

seed.solutions = [
  {
    "slug": "enterprise-software",
    "title": "Enterprise Software",
    "subtitle": "Streamline Core Operations and Administrative Controls at Scale",
    "icon": "Building2",
    "category": "Business Solutions",
    "challenges": {
      "title": "Operational Inefficiencies and System Fragmentation",
      "points": ["High maintenance costs.", "Disconnected data pipelines.", "Lack of role-based compliance controls."],
      "impact": "Limits organizational agility."
    },
    "ourSolution": {
      "overview": "We build custom core operational software systems.",
      "capabilities": ["Centralized operational databases.", "Granular role-based access management."]
    },
    "features": [
      { "title": "Workflow Automation", "description": "Trigger automatic reporting.", "icon": "Repeat" }
    ],
    "howItWorks": [],
    "benefits": {
      "roi": "45% reduction in manual data entry overhead.",
      "efficiency": "Consolidated reporting pipelines.",
      "scalability": "Elastic containers.",
      "security": "End-to-end data encryption."
    },
    "industries": [],
    "techStack": ["Node.js", "PostgreSQL", "Docker"],
    "metrics": [],
    "faqs": []
  },
  {
    "slug": "autonomous-agents",
    "title": "Autonomous Agents",
    "subtitle": "Integrate autonomous intelligence agents into your business backend.",
    "icon": "Brain",
    "category": "AI Solutions",
    "challenges": { "title": "N/A", "points": ["N/A"], "impact": "N/A" },
    "ourSolution": { "overview": "N/A", "capabilities": ["N/A"] },
    "features": [],
    "howItWorks": [],
    "benefits": { "roi": "N/A", "efficiency": "N/A", "scalability": "N/A", "security": "N/A" },
    "industries": [],
    "techStack": [],
    "metrics": [],
    "faqs": []
  },
  {
    "slug": "digital-transform",
    "title": "Digital Transformation",
    "subtitle": "Modernize your legacy applications with cloud-native solutions.",
    "icon": "Cloud",
    "category": "Digital Solutions",
    "challenges": { "title": "N/A", "points": ["N/A"], "impact": "N/A" },
    "ourSolution": { "overview": "N/A", "capabilities": ["N/A"] },
    "features": [],
    "howItWorks": [],
    "benefits": { "roi": "N/A", "efficiency": "N/A", "scalability": "N/A", "security": "N/A" },
    "industries": [],
    "techStack": [],
    "metrics": [],
    "faqs": []
  }
];

fs.writeFileSync('seed.json', JSON.stringify(seed, null, 2));
console.log('Solutions added!');
