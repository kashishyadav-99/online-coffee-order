const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('backend/send-sms.js', 'utf8');

// 1. Add Address to POST /api/order
content = content.replace(
  'const { name, mobile, email, coffee_order, quantity, price, date } = req.body;',
  'const { name, mobile, email, address, coffee_order, quantity, price, date } = req.body;'
);
content = content.replace(
  'if (!name || !mobile || !email || !coffee_order || !quantity) {',
  'if (!name || !mobile || !email || !address || !coffee_order || !quantity) {'
);
content = content.replace(
  'const orderData = { name, mobile, email, coffee_order, quantity, price, date };',
  'const orderData = { name, mobile, email, address, coffee_order, quantity, price, date };'
);
content = content.replace(
  'Mobile: ${mobile}\\nEmail: ${email}',
  'Mobile: ${mobile}\\nEmail: ${email}\\nAddress: ${address}'
);

// 2. Add GET /api/orders route
const getRoute = `
/**
 * GET /api/orders
 * Fetch all stored orders
 */
app.get('/api/orders', (req, res) => {
  try {
    const ordersFilePath = path.join(__dirname, 'orders.json');
    if (fs.existsSync(ordersFilePath)) {
      const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
      const orders = JSON.parse(fileContent);
      res.json({ success: true, orders });
    } else {
      res.json({ success: true, orders: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
`;
if (!content.includes('app.get(\'/api/orders\'')) {
  content = content.replace('// Health check endpoint', getRoute + '\n// Health check endpoint');
}

fs.writeFileSync('backend/send-sms.js', content);
console.log('Successfully updated backend/send-sms.js');
