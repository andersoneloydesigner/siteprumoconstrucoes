const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update nav container height
code = code.replace(/className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full"/g, 'className="flex justify-between items-center h-20 md:h-28 px-6 max-w-7xl mx-auto w-full"');

// Update a tag height
code = code.replace(/className="flex items-center group h-16"/g, 'className="flex items-center group h-16 md:h-24"');

// Update min-h of the hero section so it accounts for the new nav height on desktop. It was min-h-[calc(100vh-80px)]
code = code.replace(/min-h-\[calc\(100vh-80px\)\]/g, 'min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-112px)]');

fs.writeFileSync('src/App.tsx', code);
console.log("Done patching nav in App.tsx");
