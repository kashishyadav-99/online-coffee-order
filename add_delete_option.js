const fs = require('fs');

// --- 1. Update Backend ---
const backendFile = 'backend/send-sms.js';
let backendContent = fs.readFileSync(backendFile, 'utf8');

const deleteRoute = `
/**
 * DELETE /api/orders/:index
 * Delete an order by index
 */
app.delete('/api/orders/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const ordersFilePath = path.join(__dirname, 'orders.json');
    if (fs.existsSync(ordersFilePath)) {
      const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
      let orders = JSON.parse(fileContent);
      if (index >= 0 && index < orders.length) {
        orders.splice(index, 1);
        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
        return res.json({ success: true, message: 'Deleted successfully' });
      }
    }
    res.status(404).json({ success: false, error: 'Order not found' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
`;

if (!backendContent.includes('app.delete(\'/api/orders/:index\'')) {
  backendContent = backendContent.replace('// Health check endpoint', deleteRoute + '\n// Health check endpoint');
  fs.writeFileSync(backendFile, backendContent);
}

// --- 2. Update Frontend (modern-menu.html) ---
const frontendFile = 'modern-menu.html';
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

// Add Action column header
frontendContent = frontendContent.replace(
  '<th>Qty</th>\n          </tr>',
  '<th>Qty</th>\n            <th>Action</th>\n          </tr>'
);

// Update JavaScript to generate delete button and attach listeners
const oldJsLoop = `data.orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = \\\`
              <td>\\\${order.name || '-'}</td>
              <td>\\\${order.mobile || '-'}</td>
              <td>\\\${order.email || '-'}</td>
              <td>\\\${order.address || '-'}</td>
              <td>\\\${order.coffee_order || '-'}</td>
              <td>\\\${order.quantity || '-'}</td>
            \\\`;
            tbody.appendChild(tr);
          });`;

const newJsLoop = `data.orders.forEach((order, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = \\\`
              <td>\\\${order.name || '-'}</td>
              <td>\\\${order.mobile || '-'}</td>
              <td>\\\${order.email || '-'}</td>
              <td>\\\${order.address || '-'}</td>
              <td>\\\${order.coffee_order || '-'}</td>
              <td>\\\${order.quantity || '-'}</td>
              <td><button class="btn-delete-order" data-index="\\\${index}" style="background:var(--danger);color:#fff;border:none;padding:5px 10px;border-radius:var(--radius-sm);cursor:pointer;font-size:0.8rem;">Delete</button></td>
            \\\`;
            tbody.appendChild(tr);
          });
          
          document.querySelectorAll('.btn-delete-order').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              if(confirm('Are you sure you want to delete this order?')) {
                const idx = e.target.dataset.index;
                try {
                  const dRes = await fetch('http://localhost:3001/api/orders/' + idx, { method: 'DELETE' });
                  if(dRes.ok) {
                    viewBtn.click();
                  } else {
                    alert('Failed to delete');
                  }
                } catch(err) {
                  alert('Error deleting order');
                }
              }
            });
          });`;

frontendContent = frontendContent.replace(oldJsLoop, newJsLoop);

fs.writeFileSync(frontendFile, frontendContent);
console.log('Successfully updated files for delete option!');
