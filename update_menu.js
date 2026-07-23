const fs = require('fs');
let content = fs.readFileSync('modern-menu.html', 'utf8');

// 1. Add Buy Now button
content = content.replace(
  /<button class="add-cart-btn" data-name="([^"]+)" data-price="([^"]+)">Add to Cart<\/button>/g,
  '<div class="action-buttons"><button class="add-cart-btn" data-name="$1" data-price="$2">Add to Cart</button><button class="buy-now-btn" data-name="$1" data-price="$2">Buy Now</button></div>'
);

// 2. Add CSS for modal and buttons
const css = `
.action-buttons { display: flex; gap: 10px; margin-top: 10px; }
.buy-now-btn { flex: 1; padding: 11px; border-radius: var(--radius-sm); background: var(--gold); border: 1px solid var(--gold); color: #1a1209; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; transition: transform .25s, box-shadow .25s; display: flex; align-items: center; justify-content: center; }
.buy-now-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(201,162,39,0.55); }
.add-cart-btn { flex: 1; }
.buy-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 2000; display: none; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
.buy-modal { background: var(--bg-alt); padding: 30px; border-radius: var(--radius-lg); border: 1px solid var(--gold-dim); width: 90%; max-width: 400px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.8); }
.buy-modal h2 { margin-bottom: 20px; font-size: 1.5rem; color: var(--gold); }
.buy-modal .form-group { margin-bottom: 15px; }
.buy-modal label { display: block; margin-bottom: 5px; font-size: 0.85rem; color: var(--text-muted); }
.buy-modal input { width: 100%; padding: 10px; background: var(--bg); border: 1px solid var(--brown-light); color: var(--cream); border-radius: var(--radius-sm); }
.buy-modal-actions { display: flex; gap: 15px; margin-top: 25px; }
.btn-cancel { background: transparent; color: var(--text-muted); border: 1px solid var(--brown-light); padding: 10px; border-radius: var(--radius-sm); flex: 1; cursor: pointer; }
.btn-submit { background: var(--gold); color: #1a1209; border: none; padding: 10px; border-radius: var(--radius-sm); flex: 1; font-weight: bold; cursor: pointer; }
`;
content = content.replace('</style>', css + '</style>');

// 3. Add Modal HTML and JS
const modalHtml = `
<div class="buy-modal-overlay" id="buyModal">
  <div class="buy-modal">
    <h2>Complete Order</h2>
    <form id="buyForm">
      <input type="hidden" id="buyItemName">
      <input type="hidden" id="buyItemPrice">
      <div class="form-group">
        <label>Name</label>
        <input type="text" id="buyName" required>
      </div>
      <div class="form-group">
        <label>Mobile Number</label>
        <input type="tel" id="buyMobile" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="buyEmail" required>
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" id="buyQuantity" value="1" min="1" required>
      </div>
      <div class="buy-modal-actions">
        <button type="button" class="btn-cancel" id="cancelBuy">Cancel</button>
        <button type="submit" class="btn-submit">Order Now</button>
      </div>
    </form>
  </div>
</div>
`;

const js = `
function initBuyNow() {
  const buyBtns = document.querySelectorAll('.buy-now-btn');
  const modal = document.getElementById('buyModal');
  const cancelBtn = document.getElementById('cancelBuy');
  const form = document.getElementById('buyForm');
  const itemNameInput = document.getElementById('buyItemName');
  const itemPriceInput = document.getElementById('buyItemPrice');

  buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      itemNameInput.value = btn.dataset.name;
      itemPriceInput.value = btn.dataset.price;
      modal.style.display = 'flex';
    });
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('buyName').value,
        mobile: document.getElementById('buyMobile').value,
        email: document.getElementById('buyEmail').value,
        quantity: document.getElementById('buyQuantity').value,
        coffee_order: itemNameInput.value,
        price: itemPriceInput.value,
        date: new Date().toISOString()
      };
      
      try {
        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Processing...';
        btn.disabled = true;
        
        const response = await fetch('http://localhost:3001/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if(response.ok) {
          alert('Order placed successfully! Confirmation email will be sent.');
          modal.style.display = 'none';
          form.reset();
        } else {
          alert('Failed to place order. Please try again.');
        }
      } catch(err) {
        alert('Error connecting to server.');
      } finally {
        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Order Now';
        btn.disabled = false;
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initBuyNow, 200);
});
`;

content = content.replace('</body>', modalHtml + '<script>' + js + '</script>' + '</body>');
fs.writeFileSync('modern-menu.html', content);
console.log('Successfully updated modern-menu.html');
