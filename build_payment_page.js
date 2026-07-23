const fs = require('fs');

const frontendFile = 'modern-menu.html';
let content = fs.readFileSync(frontendFile, 'utf8');

// Find where to split the file
const splitString = '<div class="buy-modal-overlay" id="buyModal">';
const index = content.indexOf(splitString);

if (index === -1) {
  console.log('Error: Could not find buyModal in the file!');
  process.exit(1);
}

// Keep everything before the modal
const topHalf = content.substring(0, index);

// New content to append
const bottomHalf = `
<style>
/* New Payment Modal Styles */
.payment-modal { background: var(--bg-alt); width: 95%; max-width: 420px; border-radius: var(--radius-lg); overflow: hidden; position: relative; border: 1px solid var(--gold-dim); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.8); display: flex; flex-direction: column; }
.payment-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid rgba(201,162,39,0.1); }
.payment-header .back-btn { background: none; border: none; color: var(--gold); font-size: 1.2rem; cursor: pointer; padding: 0 10px 0 0; }
.payment-header h3 { font-size: 1rem; color: var(--cream); margin: 0; text-transform: uppercase; letter-spacing: 0.05em; }
.payment-header .step-badge { background: rgba(201,162,39,0.15); color: var(--gold); padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; border: 1px solid var(--gold-dim); }
.payment-banner { background: linear-gradient(135deg, rgba(201,162,39,0.1), transparent); padding: 12px; text-align: center; color: var(--gold-light); font-weight: 600; font-size: 0.9rem; border-bottom: 1px dashed var(--gold-dim); }
.payment-body { padding: 24px; }
.payment-body > h4 { margin-bottom: 16px; font-size: 1.05rem; color: var(--cream); }
.payment-option { border: 1px solid var(--brown-light); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.25s; }
.payment-option:hover { border-color: var(--gold-dim); background: rgba(201,162,39,0.03); }
.payment-option.selected { border-color: var(--gold); background: rgba(201,162,39,0.08); }
.payment-option .opt-left { display: flex; align-items: center; gap: 14px; }
.payment-option .opt-price { font-family: var(--font-display); font-size: 1.2rem; color: var(--cream); font-weight: bold; min-width: 60px; border-right: 1px dashed var(--brown-light); padding-right: 14px; }
.payment-option .opt-details h5 { font-size: 1rem; margin-bottom: 4px; color: var(--cream); font-weight: 600; }
.payment-option .opt-details span { font-size: 0.8rem; color: var(--text-muted); }
.payment-radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--brown-light); display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.payment-option.selected .payment-radio { border-color: var(--gold); }
.payment-option.selected .payment-radio::after { content: ""; width: 12px; height: 12px; border-radius: 50%; background: var(--gold); transition: 0.2s; }
.payment-footer { border-top: 1px solid rgba(201,162,39,0.1); padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; background: var(--bg); }
.payment-footer .total-col { display: flex; flex-direction: column; }
.payment-footer .total-price { font-family: var(--font-display); font-size: 1.5rem; color: var(--cream); font-weight: bold; }
.payment-footer .view-details { font-size: 0.75rem; color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-top: 2px; }
.btn-place-order { background: var(--gold); color: #1a1209; border: none; padding: 14px 28px; border-radius: var(--radius-sm); font-weight: bold; font-size: 1.05rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.btn-place-order:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(201,162,39,0.55); }
.btn-place-order:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }

/* Details Modal Styles */
.details-modal { width: 95%; max-width: 800px; padding: 40px; }
.orders-table-wrapper { overflow-x: auto; margin-top: 20px; }
.orders-table { width: 100%; border-collapse: collapse; text-align: left; }
.orders-table th, .orders-table td { padding: 12px; border-bottom: 1px solid var(--brown-light); font-size: 0.9rem; }
.orders-table th { color: var(--gold); text-transform: uppercase; letter-spacing: 0.05em; }
.close-details-btn { margin-top: 30px; background: var(--brown-light); color: var(--cream); border: none; padding: 10px 20px; border-radius: var(--radius-sm); cursor: pointer; }

/* Receipt Modal Styles - Realistic Printed Paper */
.receipt-modal {
  background: #fff;
  color: #111;
  width: 90%;
  max-width: 320px;
  margin: 30px auto;
  padding: 30px 20px;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Zigzag edges */
.receipt-modal::before,
.receipt-modal::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 12px;
  background-size: 24px 24px;
}

.receipt-modal::before {
  top: -12px;
  background-image: 
    linear-gradient(135deg, #fff 25%, transparent 25%),
    linear-gradient(225deg, #fff 25%, transparent 25%);
  background-position: 50% 100%;
}

.receipt-modal::after {
  bottom: -12px;
  background-image: 
    linear-gradient(135deg, transparent 75%, #fff 75%),
    linear-gradient(225deg, transparent 75%, #fff 75%);
  background-position: 50% 0;
}

.receipt-header { text-align: center; margin-bottom: 15px; }
.receipt-header h2 { margin: 0 0 10px 0; font-size: 22px; font-family: Arial, sans-serif; font-weight: 900; color: #111; letter-spacing: 2px; }
.receipt-header p { margin: 5px 0; font-size: 13px; }
.receipt-divider { border-bottom: 2px dashed #444; margin: 15px 0; }
.receipt-info { font-size: 13px; margin-bottom: 15px; }
.receipt-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
.receipt-table { width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 15px; text-align: left; }
.receipt-table th { font-weight: normal; padding-bottom: 10px; border-bottom: 1px dashed #444; }
.receipt-table td { padding: 8px 0; vertical-align: top; }
.receipt-totals { font-size: 14px; }
.receipt-total-price { font-size: 20px; margin-bottom: 15px; align-items: center; font-weight: bold; }
.receipt-footer { text-align: center; margin-top: 20px; font-size: 14px; }
.receipt-footer p { margin: 5px 0; }
.barcode-img { width: 80%; height: 40px; margin: 15px auto 5px; background: repeating-linear-gradient(to right, #111, #111 3px, transparent 3px, transparent 6px, #111 6px, #111 8px, transparent 8px, transparent 10px, #111 10px, #111 14px, transparent 14px, transparent 16px); }
.close-receipt-btn { display: block; width: 100%; margin-top: 25px; padding: 12px; background: #222; color: #fff; border: none; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
.close-receipt-btn:hover { background: #000; }
</style>

<!-- STEP 1: CUSTOMER DETAILS -->
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
        <label>Address</label>
        <textarea id="buyAddress" required rows="2" style="width:100%; padding:10px; background:var(--bg); border:1px solid var(--brown-light); color:var(--cream); border-radius:var(--radius-sm); resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" id="buyQuantity" value="1" min="1" required>
      </div>
      <div class="buy-modal-actions">
        <button type="button" class="btn-cancel" id="cancelBuy">Cancel</button>
        <button type="submit" class="btn-submit" id="continueToPaymentBtn">Continue to Payment</button>
      </div>
    </form>
  </div>
</div>

<!-- STEP 2: PAYMENT METHOD -->
<div class="buy-modal-overlay" id="paymentModalOverlay">
  <div class="payment-modal">
    <div class="payment-header">
      <button class="back-btn" id="paymentBackBtn">&#10094;</button>
      <h3>Payment Method</h3>
      <span class="step-badge">STEP 2/2</span>
    </div>
    <div class="payment-banner">
      &#10024; Extra priority processing with Online Pay
    </div>
    <div class="payment-body">
      <h4>Select payment method</h4>
      
      <div class="payment-option selected" data-method="Cash">
        <div class="opt-left">
          <div class="opt-price pay-price-cash">₹0</div>
          <div class="opt-details">
            <h5>Cash on Delivery &#128181;</h5>
            <span>Pay when you receive it</span>
          </div>
        </div>
        <div class="payment-radio"></div>
      </div>
      
      <div class="payment-option" data-method="Online">
        <div class="opt-left">
          <div class="opt-price pay-price-online">₹0</div>
          <div class="opt-details">
            <h5>Pay Online &#128179;</h5>
            <span style="color:var(--gold);">Safe and secure payment</span>
          </div>
        </div>
        <div class="payment-radio"></div>
      </div>
    </div>
    
    <div class="payment-footer">
      <div class="total-col">
        <span class="total-price pay-footer-total">₹0</span>
        <span class="view-details">VIEW PRICE DETAILS</span>
      </div>
      <button class="btn-place-order" id="placeOrderBtn">Place Order</button>
    </div>
  </div>
</div>

<!-- ADMIN: CUSTOMER ORDERS LIST -->
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
            <th>Pay</th>
            <th>Action</th>
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

<!-- RECEIPT MODAL -->
<div class="buy-modal-overlay" id="receiptModalOverlay" style="display: none; z-index: 10000;">
  <div class="receipt-modal">
    <div class="receipt-header">
      <h2>COFFEE SHOP</h2>
      <p>123 CAFFEINE AVE, NY</p>
      <p>TEL: +1-234-567-890</p>
    </div>
    <div class="receipt-divider"></div>
    <div class="receipt-info">
      <div class="receipt-row"><span>DATE: <span id="receiptDateStr"></span></span><span>CASHIER: 01</span></div>
      <div class="receipt-row"><span>ORDER NO: <span id="receiptOrderNo">#0042</span></span></div>
    </div>
    <table class="receipt-table">
      <thead>
        <tr>
          <th style="text-align: left;">ITEM</th>
          <th style="text-align: center; width: 40px;">QTY</th>
          <th style="text-align: right; width: 70px;">TOTAL</th>
        </tr>
      </thead>
      <tbody id="receiptTableBody">
      </tbody>
    </table>
    <div class="receipt-divider"></div>
    <div class="receipt-totals">
      <div class="receipt-row receipt-total-price">
        <span>TOTAL DUE</span>
        <span id="receiptTotalAmount"></span>
      </div>
      <div class="receipt-row">
        <span>CASH (COD)</span>
        <span id="receiptCashAmount"></span>
      </div>
    </div>
    <div class="receipt-divider"></div>
    <div class="receipt-footer">
      <p style="font-weight: bold;">THANK YOU!</p>
      <p style="font-size: 11px;">PLEASE COME AGAIN</p>
      <div class="barcode-img"></div>
      <p style="font-size: 10px; letter-spacing: 4px; margin-top: 5px;">* 1 2 3 4 5 6 7 8 9 *</p>
    </div>
    <button class="close-receipt-btn" id="closeReceiptBtn">GO TO MENU PAGE</button>
  </div>
</div>

<!-- ORDER CONFIRM MODAL -->
<div class="buy-modal-overlay" id="orderConfirmModal" style="display: none; z-index: 10000; align-items: center; justify-content: center;">
  <div style="background: var(--bg-alt); padding: 40px; border-radius: var(--radius-lg); text-align: center; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); border: 1px solid var(--gold-dim);">
    <div style="font-size: 60px; color: #8fd19e; margin-bottom: 20px;">&#10004;</div>
    <h2 style="color: var(--cream); margin-bottom: 15px;">Order Confirmed!</h2>
    <p id="orderConfirmText" style="color: var(--text-muted); margin-bottom: 30px;">Your order has been successfully placed.</p>
    <button id="closeOrderConfirmBtn" class="btn-primary" style="width: 100%;">Done</button>
  </div>
</div>

<script>
// --- Checkout Flow Logic ---
function initBuyNow() {
  const buyBtns = document.querySelectorAll('.buy-now-btn');
  const modal = document.getElementById('buyModal');
  const cancelBtn = document.getElementById('cancelBuy');
  const form = document.getElementById('buyForm');
  const itemNameInput = document.getElementById('buyItemName');
  const itemPriceInput = document.getElementById('buyItemPrice');

  const paymentModal = document.getElementById('paymentModalOverlay');
  const paymentBackBtn = document.getElementById('paymentBackBtn');
  const paymentOptions = document.querySelectorAll('.payment-option');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  
  let selectedMethod = 'Cash';

  // 1. Open Step 1
  buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      itemNameInput.value = btn.dataset.name;
      itemPriceInput.value = btn.dataset.price;
      modal.style.display = 'flex';
    });
  });

  // Cancel Step 1
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      form.reset();
    });
  }

  // 2. Submit Step 1 -> Go to Step 2
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop normal submission
      
      // Calculate totals
      const priceStr = itemPriceInput.value.replace(/[^0-9]/g, '');
      const price = parseInt(priceStr, 10) || 0;
      const qty = parseInt(document.getElementById('buyQuantity').value, 10) || 1;
      const total = price * qty;
      
      // Update UI with total
      document.querySelectorAll('.pay-price-cash').forEach(e => e.textContent = '₹' + total);
      document.querySelectorAll('.pay-price-online').forEach(e => e.textContent = '₹' + total);
      document.querySelectorAll('.pay-footer-total').forEach(e => e.textContent = '₹' + total);
      
      // Hide Step 1, Show Step 2
      modal.style.display = 'none';
      paymentModal.style.display = 'flex';
    });
  }

  // Back from Step 2 to Step 1
  if (paymentBackBtn) {
    paymentBackBtn.addEventListener('click', () => {
      paymentModal.style.display = 'none';
      modal.style.display = 'flex';
    });
  }

  // Select Payment Option
  paymentOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      paymentOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedMethod = opt.dataset.method;
    });
  });

  // 3. Final Submit (Place Order)
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', async () => {
      const data = {
        name: document.getElementById('buyName').value,
        mobile: document.getElementById('buyMobile').value,
        email: document.getElementById('buyEmail').value,
        address: document.getElementById('buyAddress').value,
        payment_method: selectedMethod,
        quantity: document.getElementById('buyQuantity').value,
        coffee_order: itemNameInput.value,
        price: itemPriceInput.value,
        date: new Date().toISOString()
      };
      
      try {
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;
        
        const response = await fetch('http://localhost:3001/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          if (selectedMethod === 'Cash') {
            // Populate Receipt Modal
            const qty = parseInt(data.quantity) || 1;
            const unitPrice = parseFloat(data.price.toString().replace(/[^0-9.]/g, '')) || 0;
            const total = (qty * unitPrice).toFixed(2);
            
            document.getElementById('receiptDateStr').textContent = new Date().toLocaleString();
            document.getElementById('receiptTableBody').innerHTML = \`
              <tr>
                <td style="text-align: left;">\${data.coffee_order}</td>
                <td style="text-align: center;">\${data.quantity}</td>
                <td style="text-align: right;">₹\${total}</td>
              </tr>
            \`;
            document.getElementById('receiptTotalAmount').textContent = '₹' + total;
            document.getElementById('receiptCashAmount').textContent = '₹' + total;
            
            paymentModal.style.display = 'none';
            document.getElementById('receiptModalOverlay').style.display = 'flex';
          } else {
            document.getElementById('orderConfirmText').textContent = "Your online payment was successful and your order has been placed.";
            paymentModal.style.display = 'none';
            document.getElementById('orderConfirmModal').style.display = 'flex';
          }
        } else {
          alert('Failed to place order. Please try again.');
        }
      } catch (err) {
        console.error('Order submission error:', err);
        alert('Error connecting to server. Check console for details.');
      } finally {
        placeOrderBtn.textContent = 'Place Order';
        placeOrderBtn.disabled = false;
      }
    });
  }

  // Close Receipt Modal
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      window.location.href = 'modern-menu.html';
    });
  }

  // Close Order Confirm Modal
  const closeOrderConfirmBtn = document.getElementById('closeOrderConfirmBtn');
  if (closeOrderConfirmBtn) {
    closeOrderConfirmBtn.addEventListener('click', () => {
      document.getElementById('orderConfirmModal').style.display = 'none';
      form.reset();
      selectedMethod = 'Cash';
      paymentOptions.forEach(o => o.classList.remove('selected'));
      if (paymentOptions[0]) paymentOptions[0].classList.add('selected'); // Reset visual
    });
  }
}

// --- Admin Orders Logic ---
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initBuyNow, 200);

  const viewBtn = document.getElementById('viewCustomerDetails');
  const detailsModal = document.getElementById('detailsModal');
  const closeDetailsBtn = document.getElementById('closeDetailsModal');
  const tbody = document.getElementById('ordersTableBody');

  if (viewBtn) {
    viewBtn.addEventListener('click', async () => {
      detailsModal.style.display = 'flex';
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Loading...</td></tr>';
      
      try {
        const res = await fetch('http://localhost:3001/api/orders');
        const data = await res.json();
        if (data.success) {
          if (data.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No orders found.</td></tr>';
            return;
          }
          
          tbody.innerHTML = '';
          data.orders.forEach((order, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = \`
              <td>\${order.name || '-'}</td>
              <td>\${order.mobile || '-'}</td>
              <td>\${order.email || '-'}</td>
              <td>\${order.address || '-'}</td>
              <td>\${order.coffee_order || '-'}</td>
              <td>\${order.quantity || '-'}</td>
              <td>\${order.payment_method || '-'}</td>
              <td><button class="btn-delete-order" data-index="\${index}" style="background:var(--danger);color:#fff;border:none;padding:5px 10px;border-radius:var(--radius-sm);cursor:pointer;font-size:0.8rem;">Delete</button></td>
            \`;
            tbody.appendChild(tr);
          });

          
          // Attach listeners to delete buttons
          document.querySelectorAll('.btn-delete-order').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              if (confirm('Are you sure you want to delete this order?')) {
                const idx = e.target.dataset.index;
                try {
                  const dRes = await fetch('http://localhost:3001/api/orders/' + idx, { method: 'DELETE' });
                  if (dRes.ok) {
                    viewBtn.click(); // Reload the data
                  } else {
                    alert('Failed to delete order.');
                  }
                } catch(err) {
                  alert('Error deleting order.');
                }
              }
            });
          });
        }
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:red;">Failed to load data.</td></tr>';
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
</body>
</html>
`;

fs.writeFileSync(frontendFile, topHalf + bottomHalf);
console.log('Successfully rebuilt modals in modern-menu.html');
