const fs = require('fs');

const file = 'index (3).html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add 7th item to gallery
const galleryStr = '<div class="g-item"><img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=500&q=80" alt="Cozy corner table with coffee"><span class="g-label">Window Seats</span></div>';
const newGalleryStr = galleryStr + '\n      <div class="g-item"><img src="https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=700&q=80" alt="Pouring coffee into a cup"><span class="g-label">Perfect Pour</span></div>';

content = content.replace(galleryStr, newGalleryStr);

// 2. Add CSS for nth-child(7) and nth-child(5)
const cssTarget = '.g-item:nth-child(6) { grid-row: span 2; }';
const newCss = cssTarget + '\n.g-item:nth-child(5) { grid-row: span 2; }\n.g-item:nth-child(7) { grid-column: span 2; grid-row: span 2; }';

content = content.replace(cssTarget, newCss);

fs.writeFileSync(file, content);
console.log('Successfully updated gallery grid in index (3).html');
