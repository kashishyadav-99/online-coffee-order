
// --- Checkout Flow Logic ---

// Add listener to the floating cart button
document.addEventListener('DOMContentLoaded', () => {
  const fab = document.querySelector('.cart-fab');
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const closeBtn = document.getElementById('cartCloseBtn');
  const container = document.getElementById('cartItemsContainer');
  const totalPriceEl = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');

  function getCart() {
    return JSON.parse(localStorage.getItem('artisan-cart') || '[]');
  }

  function renderCart() {
    const cart = getCart();
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
      totalPriceEl.textContent = '₹0';
      checkoutBtn.style.display = 'none';
      return;
    }

    checkoutBtn.style.display = 'block';
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-qty">Qty: ${item.qty}</span>
        </div>
        <div class="cart-item-info" style="text-align:right;">
          <p>₹${itemTotal}</p>
          <button class="cart-item-remove" data-index="${index}" style="background:var(--danger);color:#fff;border:none;padding:2px 8px;border-radius:var(--radius-sm);cursor:pointer;font-size:0.75rem;margin-top:6px;">Remove</button>
        </div>
      `;
      container.appendChild(div);
    });

    totalPriceEl.textContent = '₹' + total;
  }

  function toggleCart(show) {
    if (show) {
      renderCart();
      overlay.classList.add('open');
      setTimeout(() => drawer.classList.add('open'), 10);
    } else {
      drawer.classList.remove('open');
      setTimeout(() => overlay.classList.remove('open'), 300);
    }
  }

  if (fab) {
    fab.addEventListener('click', () => toggleCart(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCart(false));
  }
  if (overlay) {
    overlay.addEventListener('click', () => toggleCart(false));
  }
  
  if (container) {
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('cart-item-remove')) {
        const idx = parseInt(e.target.dataset.index, 10);
        const cart = getCart();
        cart.splice(idx, 1);
        localStorage.setItem('artisan-cart', JSON.stringify(cart));
        renderCart();
        
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        document.querySelectorAll('.cart-count').forEach(el => { el.textContent = count; });
      }
    });
  }
  
  // Connect Cart Checkout to the Buy Modal
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if(cart.length === 0) return;
      
      const combinedName = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
      const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      
      const itemNameInput = document.getElementById('buyItemName');
      const itemPriceInput = document.getElementById('buyItemPrice');
      const modal = document.getElementById('buyModal');
      const qtyWrapper = document.getElementById('buyQuantity').parentElement;
      const qtyInput = document.getElementById('buyQuantity');
      
      itemNameInput.value = combinedName;
      itemPriceInput.value = totalPrice;
      
      // Hide Quantity since it's already pre-calculated from the cart
      qtyWrapper.style.display = 'none';
      qtyInput.value = 1; 
      
      toggleCart(false);
      modal.style.display = 'flex';
    });
  }
});

function initBuyNow() {
  const buyBtns = document.querySelectorAll('.buy-now-btn');
  const modal = document.getElementById('buyModal');
  const cancelBtn = document.getElementById('cancelBuy');
  const form = document.getElementById('buyForm');
  const itemNameInput = document.getElementById('buyItemName');
  const itemPriceInput = document.getElementById('buyItemPrice');
  const qtyWrapper = document.getElementById('buyQuantity').parentElement;

  const paymentModal = document.getElementById('paymentModalOverlay');
  const paymentBackBtn = document.getElementById('paymentBackBtn');
  const paymentOptions = document.querySelectorAll('.payment-option');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  
  let selectedMethod = 'Cash';

  // 1. Open Step 1 (Direct Buy Now)
  buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      itemNameInput.value = btn.dataset.name;
      itemPriceInput.value = btn.dataset.price;
      qtyWrapper.style.display = 'block'; // Ensure it's visible for direct buy
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
            
            document.getElementById('receiptDateStr').textContent = new Date().toLocaleDateString();
            document.getElementById('receiptTableBody').innerHTML = `
              <tr>
                <td style="text-align: left;">${data.coffee_order}</td>
                <td style="text-align: center;">${data.quantity}</td>
                <td style="text-align: right;">₹${total}</td>
              </tr>
            `;
            document.getElementById('receiptTotalAmount').textContent = '₹' + total;
            document.getElementById('receiptCashAmount').textContent = '₹' + total;
            
            paymentModal.style.display = 'none';
            document.getElementById('receiptModalOverlay').style.display = 'flex';
          } else {
            alert('Order placed successfully! Confirmation email will be sent.');
            paymentModal.style.display = 'none';
            document.getElementById('orderConfirmModal').style.display = 'flex';
          }
          
          form.reset();
          selectedMethod = 'Cash';
          paymentOptions.forEach(o => o.classList.remove('selected'));
          if(paymentOptions[0]) paymentOptions[0].classList.add('selected'); // Reset visual
          
          // Clear cart
          localStorage.removeItem('artisan-cart');
          document.querySelectorAll('.cart-count').forEach(el => el.textContent = '0');
          
        } else {
          alert('Failed to place order. Please try again.');
        }
      } catch (err) {
        alert('Error connecting to server.');
      } finally {
        placeOrderBtn.textContent = 'Place Order';
        placeOrderBtn.disabled = false;
      }
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
            tr.innerHTML = `
              <td>${order.name || '-'}</td>
              <td>${order.mobile || '-'}</td>
              <td>${order.email || '-'}</td>
              <td>${order.address || '-'}</td>
              <td>${order.coffee_order || '-'}</td>
              <td>${order.quantity || '-'}</td>
              <td>${order.payment_method || '-'}</td>
              <td><button class="btn-delete-order" data-index="${index}" style="background:var(--danger);color:#fff;border:none;padding:5px 10px;border-radius:var(--radius-sm);cursor:pointer;font-size:0.8rem;">Delete</button></td>
            `;
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
