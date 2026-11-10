const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The user requested to delete/remove the focused category small tags (the uppercase section tags like "SOBRE", "SERVIÇOS", "GALERIA", etc.)
// Let's remove them or wrap them / comment them out where they appear with text-brand-accent font-bold bg-brand-accent/10 px-3 py-1
code = code.replace(/<span className="text-\[11px\] font-mono tracking-widest uppercase text-brand-accent font-bold bg-brand-accent\/10 px-3 py-1[^>]*>.*?<\/span>/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Removed section tags successfully");
