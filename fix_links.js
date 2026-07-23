const fs = require('fs');

const files = ['index (3).html', 'modern-menu.html', 'about (1).html', 'contact (1).html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The navbar likely has links like href="index.html" or href="menu.html"
    // Also update footer links if any
    let changed = false;

    // We want to ensure all files link to the *active* files.
    // Active files:
    // Home: index (3).html
    // Menu: modern-menu.html
    // About: about (1).html
    // Contact: contact (1).html
    
    // First, let's normalize everything to the base names to avoid double-replacements
    // e.g. if a link is already index (3).html, we don't want to break it.
    
    const replacements = [
      { pattern: /href=["'](index(?:\s\(\d+\))?\.html)["']/g, target: 'href="index (3).html"' },
      { pattern: /href=["'](menu(?:\s\(\d+\))?\.html)["']/g, target: 'href="modern-menu.html"' },
      { pattern: /href=["'](about(?:\s\(\d+\))?\.html)["']/g, target: 'href="about (1).html"' },
      { pattern: /href=["'](contact(?:\s\(\d+\))?\.html)["']/g, target: 'href="contact (1).html"' },
    ];

    replacements.forEach(rep => {
      content = content.replace(rep.pattern, (match) => {
        if (match !== rep.target) {
          changed = true;
          return rep.target;
        }
        return match;
      });
    });

    if (changed) {
      fs.writeFileSync(file, content);
      console.log('Updated links in ' + file);
    }
  }
});
