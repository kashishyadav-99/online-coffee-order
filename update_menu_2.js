const fs = require('fs');
let content = fs.readFileSync('modern-menu.html', 'utf8');

// 1. Add "Customer Details" button to navbar
// Look for: <a href="menu.html" class="btn btn-primary btn-small">Order Online</a>
if (!content.includes('id="viewCustomerDetails"')) {
  content = content.replace(
    '<a href="menu.html" class="btn btn-primary btn-small">Order Online</a>',
    '<a href="menu.html" class="btn btn-primary btn-small">Order Online</a>\n      <button id="viewCustomerDetails" class="btn btn-outline btn-small">Customer Details</button>'
  );
}

// 2. Add Address field to the Buy Now form
// Look for: <label>Email</label> ... </div>
if (!content.includes('id="buyAddress"')) {
  content = content.replace(
    /<div class="form-group">\s*<label>Email<\/label>\s*<input type="email" id="buyEmail" required>\s*<\/div>/,
    `<div class="form-group">
        <label>Email</label>
        <input type="email" id="buyEmail" required>
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea id="buyAddress" required rows="2" style="width:100%; padding:10px; background:var(--bg); border:1px solid var(--brown-light); color:var(--cream); border-radius:var(--radius-sm); resize:vertical;"></textarea>
      </div>`
  );
}

// 3. Update the fetch request to include address
content = content.replace(
  "email: document.getElementById('buyEmail').value,",
  "email: document.getElementById('buyEmail').value,\n        address: document.getElementById('buyAddress').value,"
);

// 4. Add Customer Details Modal and CSS and JS
const customerDetailsHtmlAndJs = `
<style>
.details-modal { width: 95%; max-width: 800px; padding: 40px; }
.orders-table-wrapper { overflow-x: auto; margin-top: 20px; }
.orders-table { width: 100%; border-collapse: collapse; text-align: left; }
.orders-table th, .orders-table td { padding: 12px; border-bottom: 1px solid var(--brown-light); font-size: 0.9rem; }
.orders-table th { color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; }
.close-details-btn { margin-top: 30px; background: var(--brown-light); color: var(--cream); border: none; padding: 10px 20px; border-radius: var(--radius-sm); cursor: pointer; }
</style>

<div class="buy-modal-overlay" id="detailsModal">
  <div class="buy-modal details-modal">
    <h2>Customer Orders</h2>
    <div class="orders-table-wrapper">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Order</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody id="ordersTableBody">
          <!-- Data will be injected here -->
        </tbody>
      </table>
    </div>
    <button class="close-details-btn" id="closeDetailsModal">Close</button>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.getElementById('viewCustomerDetails');
  const detailsModal = document.getElementById('detailsModal');
  const closeDetailsBtn = document.getElementById('closeDetailsModal');
  const tbody = document.getElementById('ordersTableBody');

  if (viewBtn) {
    viewBtn.addEventListener('click', async () => {
      detailsModal.style.display = 'flex';
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading...</td></tr>';
      
      try {
        const res = await fetch('http://localhost:3001/api/orders');
        const data = await res.json();
        if (data.success) {
          if (data.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No orders found.</td></tr>';
            return;
          }
          
          tbody.innerHTML = '';
          data.orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = \`
              <td>\${order.name || '-'}</td>
              <td>\${order.mobile || '-'}</td>
              <td>\${order.email || '-'}</td>
              <td>\${order.address || '-'}</td>
              <td>\${order.coffee_order || '-'}</td>
              <td>\${order.quantity || '-'}</td>
            \`;
            tbody.appendChild(tr);
          });
        }
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Failed to load data.</td></tr>';
      }
    });
  }

  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener('click', () => {
      detailsModal.style.display = 'none';
    });
  }
});
</script>
`;

if (!content.includes('id="detailsModal"')) {
  content = content.replace('</body>', customerDetailsHtmlAndJs + '\n</body>');
}

fs.writeFileSync('modern-menu.html', content);
console.log('Successfully updated modern-menu.html for customer details!');
