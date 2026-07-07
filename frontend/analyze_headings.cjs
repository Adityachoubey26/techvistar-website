const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:/Users/LENOVO/OneDrive/Desktop/Internahip_project/testproject/frontend/src');

const stats = {
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  pagesWithH1: [],
  pagesWithoutH1: [],
  pagesWithMultipleH1: [],
  filesWithH456: [],
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const h1Count = (content.match(/<(?:motion\.)?h1[\s>]/g) || []).length;
      stats.h1 += h1Count;
      
      stats.h2 += (content.match(/<(?:motion\.)?h2[\s>]/g) || []).length;
      stats.h3 += (content.match(/<(?:motion\.)?h3[\s>]/g) || []).length;
      
      const h4Count = (content.match(/<(?:motion\.)?h4[\s>]/g) || []).length;
      const h5Count = (content.match(/<(?:motion\.)?h5[\s>]/g) || []).length;
      const h6Count = (content.match(/<(?:motion\.)?h6[\s>]/g) || []).length;
      
      stats.h4 += h4Count;
      stats.h5 += h5Count;
      stats.h6 += h6Count;
      
      const isPage = fullPath.includes('\\pages\\') || fullPath.includes('/pages/');
      
      if (isPage) {
        if (h1Count === 0) stats.pagesWithoutH1.push(fullPath);
        else if (h1Count === 1) stats.pagesWithH1.push(fullPath);
        else stats.pagesWithMultipleH1.push(fullPath);
      }
      
      if (h4Count > 0 || h5Count > 0 || h6Count > 0) {
        stats.filesWithH456.push({ path: fullPath, h4: h4Count, h5: h5Count, h6: h6Count });
      }
    }
  }
}

processDir(srcDir);
console.log(JSON.stringify(stats, null, 2));
