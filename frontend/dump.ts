import { SOLUTIONS_DATA } from './src/data/solutions';
import * as fs from 'fs';

const seedPath = './seed.json';
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

const solutionsArray = Object.values(SOLUTIONS_DATA).map(s => {
  return {
    ...s,
    // Extracting the function name for Lucide icons
    icon: s.icon?.name || s.icon?.displayName || 'Building2'
  }
});

seedData.solutions = solutionsArray;

fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2));
console.log('Added solutions to seed.json');
