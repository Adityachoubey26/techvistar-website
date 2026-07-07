import { SOLUTIONS_DATA } from './src/data/solutions';
import * as fs from 'fs';

try {
  const seedPath = './seed.json';
  const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  const solutionsArray = Object.values(SOLUTIONS_DATA).map((s: any) => {
    let iconName = 'Brain';
    if (s.icon) {
      iconName = s.icon.displayName || s.icon.name || 'Brain';
    }
    
    // Some nested features also have icons, let's fix them too
    const features = s.features?.map((f: any) => ({
      ...f,
      icon: f.icon ? (f.icon.displayName || f.icon.name || 'Brain') : 'Brain'
    })) || [];

    return {
      ...s,
      icon: iconName,
      features
    };
  });

  seedData.solutions = solutionsArray;

  fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2));
  console.log(`Successfully added ${solutionsArray.length} solutions to seed.json`);
} catch (error) {
  console.error("Error:", error);
}
