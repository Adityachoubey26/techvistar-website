const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:/Users/LENOVO/OneDrive/Desktop/Internahip_project/testproject/frontend/src');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Replace <h4, <h5, <h6 with <div
      content = content.replace(/<h[456]([\s>])/g, '<div$1');
      // Replace </h4, </h5, </h6 with </div
      content = content.replace(/<\/h[456]>/g, '</div>');
      
      // Replace <motion.h4, <motion.h5, <motion.h6 with <motion.div
      content = content.replace(/<motion\.h[456]([\s>])/g, '<motion.div$1');
      // Replace </motion.h4, </motion.h5, </motion.h6 with </motion.div
      content = content.replace(/<\/motion\.h[456]>/g, '</motion.div>');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated H4-H6 to DIV: ' + fullPath);
      }
    }
  }
}

processDir(srcDir);
