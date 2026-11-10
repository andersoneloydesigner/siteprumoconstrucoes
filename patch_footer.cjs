const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update footer container height
code = code.replace(/className="flex items-center h-20 w-fit"/g, 'className="flex items-center h-20 md:h-24 w-fit"');

fs.writeFileSync('src/App.tsx', code);
console.log("Done patching footer in App.tsx");
