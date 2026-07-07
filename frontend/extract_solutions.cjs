const fs = require('fs');

let code = fs.readFileSync('src/data/solutions.ts', 'utf8');

// Strip out imports
code = code.replace(/import\s+.*?from\s+['"].*?['"];?/gs, '');

// Mock React Components
const mocks = `
  const Building2 = "Building2";
  const Brain = "Brain";
  const Sparkles = "Sparkles";
  const Cloud = "Cloud";
  const Target = "Target";
  const Layers = "Layers";
  const Code2 = "Code2";
  const Cpu = "Cpu";
  const Repeat = "Repeat";
  const Settings = "Settings";
  const FolderGit2 = "FolderGit2";
  const Shield = "Shield";
  const Clock = "Clock";
`;

// Remove typescript interface exports
code = code.replace(/export interface[\s\S]*?}\n/g, '');
code = code.replace(/export function[\s\S]*/g, '');

code = code.replace(/export const/g, 'const');

const finalCode = mocks + code + `\nconsole.log(JSON.stringify(Object.values(SOLUTIONS_DATA), null, 2));`;

eval(finalCode);
