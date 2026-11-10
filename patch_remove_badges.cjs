const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove any span with font-mono tracking-widest uppercase text-brand-accent (or similar) that appears right before section headings or inside section headers
code = code.replace(/<span className="text-\[11px\] font-mono tracking-widest uppercase[^"]*">[^<]*<\/span>/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Removed all category badges successfully");
