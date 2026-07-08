const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/data/solutions.ts');
let content = fs.readFileSync(file, 'utf8');

// Update Interface
content = content.replace(
  /challenges: \{\s*title: string;\s*points: string\[\];\s*impact: string;\s*\};\s*ourSolution: \{\s*overview: string;\s*capabilities: string\[\];\s*\};/g,
  overviewData: {
    introduction: string;
    challenges: string[];
    solutions: string[];
    outcomes: string[];
  };
);

// Update decorateSolution
content = content.replace(
  /challenges: apiSolution\.challenges \|\| \{ title: '', points: \[\], impact: '' \},\s*ourSolution: apiSolution\.ourSolution \|\| \{ overview: '', capabilities: \[\] \},/g,
  overviewData: apiSolution.overviewData || { introduction: '', challenges: [], solutions: [], outcomes: [] },
);

// Update data items
const regex = /challenges: \{\s*title: 'Key Business Challenges',\s*points: \[\s*(.*?)\s*\],\s*impact: 'Addressing these challenges leads to significant operational improvements\.'\s*\},\s*ourSolution: \{\s*overview: '(.*?)',\s*capabilities: \[\s*(.*?)\s*\]\s*\}/gs;

content = content.replace(regex, (match, points, overview, capabilities) => {
  return overviewData: {
      introduction: '',
      challenges: [
        'Legacy systems',
        'Manual workflows',
        'Data silos',
        'Poor scalability',
        'Security concerns',
        'Low productivity'
      ],
      solutions: [
        'Requirement Analysis',
        'Custom Development',
        'Secure Architecture',
        'API Integration',
        'Workflow Automation',
        'Deployment & Support'
      ],
      outcomes: [
        'Increased productivity',
        'Faster operations',
        'Reduced costs',
        'Better collaboration',
        'Scalable infrastructure',
        'Improved security'
      ]
    };
});

fs.writeFileSync(file, content, 'utf8');
console.log('Done replacing solutions.ts');
