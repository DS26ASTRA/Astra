const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace light backgrounds
  content = content.replace(/bg-\[#f4e4bc\]/g, 'bg-transparent');
  content = content.replace(/bg-[#fff5e1]/g, 'bg-transparent');
  content = content.replace(/bg-white/g, 'bg-transparent');
  content = content.replace(/bg-gray-50/g, 'bg-transparent border-t border-[var(--color-card-border)]');
  content = content.replace(/bg-gray-100/g, 'bg-[#1a1a1a]');
  
  // Replace dark texts
  content = content.replace(/text-\[#1a1a1a\]/g, 'text-white');
  content = content.replace(/text-[#2a2a2a]/g, 'text-gray-300');
  content = content.replace(/text-gray-500/g, 'text-gray-400');
  content = content.replace(/text-gray-600/g, 'text-gray-400');
  content = content.replace(/text-gray-700/g, 'text-gray-300');
  
  // Replace borders
  content = content.replace(/border-[#8b5a2b]/g, 'border-[var(--color-card-border)]');
  content = content.replace(/border-[#cd853f]/g, 'border-[var(--color-card-border-hover)]');
  content = content.replace(/border-gray-200/g, 'border-[var(--color-card-border)]');
  content = content.replace(/border-gray-300/g, 'border-[var(--color-card-border)]');
  content = content.replace(/border-gray-400/g, 'border-[var(--color-card-border)]');

  // Adjust headings
  content = content.replace(/text-\[#cd853f\]/g, 'text-[#d4af37]');
  content = content.replace(/text-\[#800000\]/g, 'text-[#ffdf00]'); // Bright gold

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
};

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
};

walk(directoryPath);
