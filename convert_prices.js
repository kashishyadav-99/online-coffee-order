const fs = require('fs');

const files = ['index.html', 'index (3).html', 'menu.html', 'modern-menu.html', 'about.html', 'about (1).html', 'contact.html', 'contact (1).html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace $4.75 with ₹394 (converting USD to INR at ~83)
    content = content.replace(/\$(\d+\.\d{2})/g, (match, p1) => {
      changed = true;
      const usd = parseFloat(p1);
      const inr = Math.round(usd * 83);
      return '₹' + inr;
    });

    // Replace data-price="4.75" with data-price="394"
    content = content.replace(/data-price="(\d+\.\d{2})"/g, (match, p1) => {
      changed = true;
      const usd = parseFloat(p1);
      const inr = Math.round(usd * 83);
      return 'data-price="' + inr + '"';
    });

    if (changed) {
      fs.writeFileSync(file, content);
      console.log('Converted prices in ' + file);
    }
  }
});
