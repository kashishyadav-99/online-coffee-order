const fs = require('fs');

// --- 1. Update Frontend (modern-menu.html) ---
const frontendFile = 'modern-menu.html';
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

// 1a. Add Payment Method Radio Buttons to Buy Form
const targetQuantity = `<div class="form-group">
        <label>Quantity</label>
        <input type="number" id="buyQuantity" value="1" min="1" required>
      </div>
      <div class="buy-modal-actions">`;
const replaceQuantity = `<div class="form-group">
        <label>Quantity</label>
        <input type="number" id="buyQuantity" value="1" min="1" required>
      </div>
      <div class="form-group">
        <label>Payment Method</label>
        <div style="display:flex; gap:15px; margin-top:5px;">
          <label style="display:flex; align-items:center; gap:5px; color:var(--cream); cursor:pointer;"><input type="radio" name="payment_method" value="Cash" required> Cash</label>
          <label style="display:flex; align-items:center; gap:5px; color:var(--cream); cursor:pointer;"><input type="radio" name="payment_method" value="Online" required> Online</label>
        </div>
      </div>
      <div class="buy-modal-actions">`;
if (frontendContent.includes(targetQuantity)) {
  frontendContent = frontendContent.replace(targetQuantity, replaceQuantity);
}

// 1b. Update JS to include payment_method
const targetJS = "address: document.getElementById('buyAddress').value,";
const replaceJS = "address: document.getElementById('buyAddress').value,\n        payment_method: document.querySelector('input[name=\"payment_method\"]:checked').value,";
if (frontendContent.includes(targetJS)) {
  frontendContent = frontendContent.replace(targetJS, replaceJS);
}

// 1c. Update Customer Details Table Header
const targetTh = "<th>Qty</th>\n            <th>Action</th>";
const replaceTh = "<th>Qty</th>\n            <th>Pay</th>\n            <th>Action</th>";
if (frontendContent.includes(targetTh)) {
  frontendContent = frontendContent.replace(targetTh, replaceTh);
}

// 1d. Update Customer Details Table Row
const targetTd = "<td>\\${order.quantity || '-'}</td>\n              <td><button class=\"btn-delete-order\"";
const replaceTd = "<td>\\${order.quantity || '-'}</td>\n              <td>\\${order.payment_method || '-'}</td>\n              <td><button class=\"btn-delete-order\"";
if (frontendContent.includes(targetTd)) {
  frontendContent = frontendContent.replace(targetTd, replaceTd);
}

fs.writeFileSync(frontendFile, frontendContent);
console.log('Updated frontend.');

// --- 2. Update Backend ---
const backendFile = 'backend/send-sms.js';
let backendContent = fs.readFileSync(backendFile, 'utf8');

backendContent = backendContent.replace(
  'const { name, mobile, email, address, coffee_order, quantity, price, date } = req.body;',
  'const { name, mobile, email, address, payment_method, coffee_order, quantity, price, date } = req.body;'
);

backendContent = backendContent.replace(
  'const orderData = { name, mobile, email, address, coffee_order, quantity, price, date };',
  'const orderData = { name, mobile, email, address, payment_method, coffee_order, quantity, price, date };'
);

backendContent = backendContent.replace(
  'Email: ${email}\\nAddress: ${address}',
  'Email: ${email}\\nAddress: ${address}\\nPayment: ${payment_method}'
);

fs.writeFileSync(backendFile, backendContent);
console.log('Updated backend.');
