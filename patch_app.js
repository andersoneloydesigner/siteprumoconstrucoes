const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Header nav links
code = code.replace(/text-\[\#D4AF37\]/g, 'text-gold');
code = code.replace(/hover:text-\[\#D4AF37\]/g, 'hover:text-gold');

// Contact button header
code = code.replace(/bg-\[\#D4AF37\] text-zinc-950 px-5 py-3 text-xs tracking-wider uppercase font-extrabold hover:bg-\[\#AA8C2C\] transition-all duration-150 active:translate-y-px border border-\[\#D4AF37\]\/50/g, 'bg-gold text-zinc-950 px-5 py-3 text-xs tracking-wider uppercase font-extrabold hover:opacity-90 transition-all duration-150 active:translate-y-px border border-[#BF953F]/50');

// Mobile menu icon hover
code = code.replace(/hover:text-\[\#D4AF37\]/g, 'hover:text-gold'); // already handled

// Mobile menu links
code = code.replace(/text-\[\#D4AF37\] font-bold/g, 'text-gold font-bold'); // already handled

// Slogan
code = code.replace(/text-\[\#D4AF37\]">\{APP_DETAILS\.slogan\}/g, 'text-gold">{APP_DETAILS.slogan}');

// Stats
code = code.replace(/text-\[\#D4AF37\] font-sans/g, 'text-gold font-sans'); // already handled

// Why choose us badge (line 353)
code = code.replace(/text-gold font-bold bg-\[\#D4AF37\]\/10 px-3 py-1 border border-\[\#D4AF37\]\/20/g, 'text-gold font-bold bg-[#BF953F]/10 px-3 py-1 border border-[#BF953F]/20');

// Card hover (line 364)
code = code.replace(/hover:border-\[\#D4AF37\]\/50/g, 'hover:border-[#BF953F]/50');

// Card icon bg (line 366)
code = code.replace(/bg-\[\#D4AF37\] text-zinc-950/g, 'bg-gold text-zinc-950');

// Testimonials (line 504)
code = code.replace(/gap-1\.5 text-gold/g, 'gap-1.5 text-brand-accent'); // wait, if I did a global replace first, this would be text-gold. Let's fix that.

// Logo sizes
code = code.replace(/className="key-logo h-12 md:h-16 w-auto object-contain transition-transform duration-150 group-hover:scale-\[1\.01\]"/g, 'className="key-logo h-16 md:h-24 w-auto object-contain transition-transform duration-150 group-hover:scale-[1.01]"');
code = code.replace(/className="h-14 md:h-16 w-auto object-contain"/g, 'className="h-20 md:h-24 w-auto object-contain"');

fs.writeFileSync('src/App.tsx', code);
console.log("Done patching App.tsx");
