const menuData = [
  {
    category: "Hot Coffee",
    categoryId: "hot-coffee",
    items: [
      { id: 'hc1', name: "House Blend Drip", ingredients: "100% Arabica, Medium Roast", prices: { Small: 200, Medium: 250, Large: 300 }, image: "images/coffee_hero_1784454797890.png" },
      { id: 'hc2', name: "Dark Roast Pour Over", ingredients: "Single Origin Colombian", prices: { Small: 250, Medium: 300, Large: 350 }, image: "images/pour_over_1784456287753.png" },
      { id: 'hc3', name: "Café au Lait", ingredients: "Brewed Coffee, Steamed Milk", prices: { Small: 220, Medium: 270, Large: 320 }, image: "images/artisan_latte_1784454812190.png" }
    ]
  },
  {
    category: "Cold Coffee",
    categoryId: "cold-coffee",
    items: [
      { id: 'cc1', name: "Cold Brew", ingredients: "Slow-steeped over 18 hours", prices: { Small: 280, Medium: 330, Large: 380 }, image: "images/iced_macchiato_1784454827251.png" },
      { id: 'cc2', name: "Nitro Cold Brew", ingredients: "Infused with nitrogen for a creamy head", prices: { Small: 350, Medium: 400, Large: 450 }, image: "images/coffee_hero_1784454797890.png" },
      { id: 'cc3', name: "Iced Vanilla Coffee", ingredients: "Iced Coffee, Vanilla Syrup, Cream", prices: { Small: 240, Medium: 290, Large: 340 }, image: "images/pour_over_1784456287753.png" }
    ]
  },
  {
    category: "Espresso",
    categoryId: "espresso",
    items: [
      { id: 'e1', name: "Espresso (Single/Double)", ingredients: "Signature Espresso Blend", prices: { Small: 150, Medium: 200, Large: 250 }, image: "images/coffee_hero_1784454797890.png" },
      { id: 'e2', name: "Espresso Con Panna", ingredients: "Espresso, Whipped Cream", prices: { Small: 180, Medium: 230, Large: 280 }, image: "images/cappuccino_foam_1784456303220.png" },
      { id: 'e3', name: "Espresso Lungo", ingredients: "Long pulled Espresso shot", prices: { Small: 160, Medium: 210, Large: 260 }, image: "images/pour_over_1784456287753.png" }
    ]
  },
  {
    category: "Cappuccino",
    categoryId: "cappuccino",
    items: [
      { id: 'cap1', name: "Classic Cappuccino", ingredients: "Espresso, Steamed Milk, Deep Foam", prices: { Small: 260, Medium: 310, Large: 360 }, image: "images/cappuccino_foam_1784456303220.png" },
      { id: 'cap2', name: "Dry Cappuccino", ingredients: "Espresso, Less Milk, More Foam", prices: { Small: 260, Medium: 310, Large: 360 }, image: "images/artisan_latte_1784454812190.png" },
      { id: 'cap3', name: "Flavored Cappuccino", ingredients: "Classic Cappuccino with Hazelnut/Vanilla", prices: { Small: 290, Medium: 340, Large: 390 }, image: "images/cappuccino_foam_1784456303220.png" }
    ]
  },
  {
    category: "Latte",
    categoryId: "latte",
    items: [
      { id: 'l1', name: "Café Latte", ingredients: "Espresso, Steamed Milk, Light Foam", prices: { Small: 270, Medium: 320, Large: 370 }, image: "images/artisan_latte_1784454812190.png" },
      { id: 'l2', name: "Vanilla Bean Latte", ingredients: "Espresso, Milk, Real Vanilla Bean", prices: { Small: 310, Medium: 360, Large: 410 }, image: "images/matcha_latte_1784456268902.png" },
      { id: 'l3', name: "Caramel Latte", ingredients: "Espresso, Milk, Caramel Syrup", prices: { Small: 300, Medium: 350, Large: 400 }, image: "images/cappuccino_foam_1784456303220.png" }
    ]
  },
  {
    category: "Mocha",
    categoryId: "mocha",
    items: [
      { id: 'm1', name: "Dark Chocolate Mocha", ingredients: "Espresso, Milk, Dark Cocoa", prices: { Small: 320, Medium: 370, Large: 420 }, image: "images/iced_macchiato_1784454827251.png" },
      { id: 'm2', name: "White Chocolate Mocha", ingredients: "Espresso, Milk, White Cocoa", prices: { Small: 320, Medium: 370, Large: 420 }, image: "images/cappuccino_foam_1784456303220.png" },
      { id: 'm3', name: "Peppermint Mocha", ingredients: "Espresso, Milk, Cocoa, Peppermint", prices: { Small: 340, Medium: 390, Large: 440 }, image: "images/artisan_latte_1784454812190.png" }
    ]
  },
  {
    category: "Americano",
    categoryId: "americano",
    items: [
      { id: 'a1', name: "Caffè Americano", ingredients: "Espresso, Hot Water", prices: { Small: 190, Medium: 230, Large: 270 }, image: "images/pour_over_1784456287753.png" },
      { id: 'a2', name: "Iced Americano", ingredients: "Espresso, Cold Water, Ice", prices: { Small: 200, Medium: 240, Large: 280 }, image: "images/iced_macchiato_1784454827251.png" },
      { id: 'a3', name: "Blonde Americano", ingredients: "Light Roast Espresso, Hot Water", prices: { Small: 210, Medium: 250, Large: 290 }, image: "images/coffee_hero_1784454797890.png" }
    ]
  },
  {
    category: "Flat White",
    categoryId: "flat-white",
    items: [
      { id: 'fw1', name: "Flat White", ingredients: "Ristretto Shots, Micro-foamed Milk", prices: { Small: 280, Medium: 330, Large: 380 }, image: "images/cappuccino_foam_1784456303220.png" },
      { id: 'fw2', name: "Oat Milk Flat White", ingredients: "Ristretto Shots, Steamed Oat Milk", prices: { Small: 320, Medium: 370, Large: 420 }, image: "images/artisan_latte_1784454812190.png" },
      { id: 'fw3', name: "Blonde Flat White", ingredients: "Blonde Ristretto, Micro-foamed Milk", prices: { Small: 290, Medium: 340, Large: 390 }, image: "images/matcha_latte_1784456268902.png" }
    ]
  },
  {
    category: "Macchiato",
    categoryId: "macchiato",
    items: [
      { id: 'mac1', name: "Espresso Macchiato", ingredients: "Espresso, Dollop of Foam", prices: { Small: 190, Medium: 240, Large: 290 }, image: "images/coffee_hero_1784454797890.png" },
      { id: 'mac2', name: "Caramel Macchiato", ingredients: "Vanilla, Milk, Espresso, Caramel", prices: { Small: 310, Medium: 360, Large: 410 }, image: "images/iced_macchiato_1784454827251.png" },
      { id: 'mac3', name: "Hazelnut Macchiato", ingredients: "Hazelnut, Milk, Espresso Layer", prices: { Small: 320, Medium: 370, Large: 420 }, image: "images/artisan_latte_1784454812190.png" }
    ]
  },
  {
    category: "Frappuccino",
    categoryId: "frappuccino",
    items: [
      { id: 'f1', name: "Mocha Frappé", ingredients: "Coffee, Milk, Ice, Chocolate Syrup", prices: { Small: 340, Medium: 390, Large: 440 }, image: "images/iced_macchiato_1784454827251.png" },
      { id: 'f2', name: "Caramel Frappé", ingredients: "Coffee, Milk, Ice, Caramel Syrup", prices: { Small: 340, Medium: 390, Large: 440 }, image: "images/matcha_latte_1784456268902.png" },
      { id: 'f3', name: "Java Chip Frappé", ingredients: "Coffee, Chocolate Chips, Ice, Milk", prices: { Small: 360, Medium: 410, Large: 460 }, image: "images/pour_over_1784456287753.png" }
    ]
  },
  {
    category: "Tea",
    categoryId: "tea",
    items: [
      { id: 't1', name: "Earl Grey Classic", ingredients: "Black Tea, Bergamot Oil", prices: { Small: 180, Medium: 220, Large: 260 }, image: "images/coffee_hero_1784454797890.png" },
      { id: 't2', name: "Matcha Green Tea Latte", ingredients: "Premium Matcha, Steamed Milk", prices: { Small: 300, Medium: 350, Large: 400 }, image: "images/matcha_latte_1784456268902.png" },
      { id: 't3', name: "Iced Peach Black Tea", ingredients: "Black Tea, Peach Infusion, Ice", prices: { Small: 220, Medium: 270, Large: 320 }, image: "images/iced_macchiato_1784454827251.png" }
    ]
  },
  {
    category: "Desserts",
    categoryId: "desserts",
    items: [
      { id: 'd1', name: "Chocolate Lava Cake", ingredients: "Rich Chocolate, Vanilla Bean Ice Cream", prices: { Small: 450, Medium: 450, Large: 450 }, image: "images/chocolate_dessert_1784454842916.png" },
      { id: 'd2', name: "Classic Tiramisu", ingredients: "Espresso, Mascarpone, Cocoa", prices: { Small: 380, Medium: 380, Large: 380 }, image: "images/cappuccino_foam_1784456303220.png" },
      { id: 'd3', name: "Butter Croissant", ingredients: "Flaky, buttery French pastry", prices: { Small: 150, Medium: 150, Large: 150 }, image: "images/coffee_hero_1784454797890.png" }
    ]
  }
];

// Initialize Menu
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('menu-sections-container');
  
  // Render Sections
  menuData.forEach(category => {
    const section = document.createElement('section');
    section.id = category.categoryId;
    section.className = 'menu-section';
    
    let html = `<h2 class="section-title">${category.category}</h2><div class="menu-grid">`;
    
    category.items.forEach(item => {
      // Default to medium price if available, else first
      const defaultSize = 'Medium';
      const defaultPrice = item.prices[defaultSize];
      
      html += `
        <div class="menu-card" data-item-id="${item.id}">
          <div class="card-header">
            <img src="${item.image}" alt="${item.name}" class="menu-img" data-name="${item.name}" data-ingredients="${item.ingredients}" data-type="${category.category}">
            <div class="card-title-area">
              <h4>${item.name}</h4>
              <span class="ingredients">${item.ingredients}</span>
            </div>
          </div>
          <div class="size-selector">
            <button class="size-btn" data-size="Small" data-price="${item.prices.Small}">S</button>
            <button class="size-btn active" data-size="Medium" data-price="${item.prices.Medium}">M</button>
            <button class="size-btn" data-size="Large" data-price="${item.prices.Large}">L</button>
          </div>
          <div class="card-footer">
            <span class="price">₹<span class="price-val">${defaultPrice}</span></span>
            <div class="action-buttons">
              <button class="add-btn">Add to Cart</button>
              <button class="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
    section.innerHTML = html;
    container.appendChild(section);
  });

  // Handle Size Selection
  document.querySelectorAll('.size-selector').forEach(selector => {
    selector.addEventListener('click', (e) => {
      if (e.target.classList.contains('size-btn')) {
        // Remove active class from siblings
        const buttons = selector.querySelectorAll('.size-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active to clicked
        e.target.classList.add('active');
        
        // Update price
        const newPrice = e.target.getAttribute('data-price');
        const card = e.target.closest('.menu-card');
        card.querySelector('.price-val').innerText = newPrice;
      }
    });
  });

  // Filter Functionality and Smooth Scroll
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.menu-section');
  const artisanSection = document.querySelector('.artisan-section');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      if (filter === 'all') {
        sections.forEach(sec => {
          sec.classList.remove('hidden');
        });
        artisanSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Show selected, hide others
        sections.forEach(sec => {
          if (sec.id === filter) {
            sec.classList.remove('hidden');
            // Smooth scroll to the section
            setTimeout(() => {
              sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          } else {
            sec.classList.add('hidden');
          }
        });
        // Hide artisan section when filtering specific categories to focus on items
        artisanSection.style.display = 'none';
      }
    });
  });

  // Modal Functionality
  const modalOverlay = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.modal-close');

  const openModal = (src, name, ingredients, type) => {
    modalImg.src = src;
    modalTitle.innerText = name;
    modalDesc.innerHTML = `<strong>Type:</strong> ${type}<br><strong>Details:</strong> ${ingredients}`;
    modalOverlay.classList.remove('hidden');
  };

  const closeModal = () => {
    modalOverlay.classList.add('hidden');
  };

  // Add event listeners to menu images
  document.querySelectorAll('.menu-img').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const name = img.getAttribute('data-name');
      const ingredients = img.getAttribute('data-ingredients');
      const type = img.getAttribute('data-type');
      openModal(src, name, ingredients, type);
    });
  });

  // Add event listeners to artisan images
  document.querySelectorAll('.artisan-img-wrapper img').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      // For artisan images, grab data from the adjacent elements
      const infoBlock = img.closest('.artisan-card').querySelector('.artisan-info');
      const name = infoBlock.querySelector('h4').innerText;
      const ingredients = infoBlock.querySelector('.artisan-desc').innerText;
      const type = "Artisan Coffee (Premium)";
      openModal(src, name, ingredients, type);
    });
  });

  // Close modal events
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    // Only close if clicking the overlay itself, not the content
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Cart Functionality
  let cart = JSON.parse(localStorage.getItem('artisan-cart')) || [];
  
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const paymentBtn = document.getElementById('payment-btn');

  const openCart = () => {
    cartOverlay.classList.remove('hidden');
    cartDrawer.classList.remove('hidden');
    renderCart();
  };

  const closeCart = () => {
    cartOverlay.classList.add('hidden');
    cartDrawer.classList.add('hidden');
  };

  const saveCart = () => {
    localStorage.setItem('artisan-cart', JSON.stringify(cart));
  };

  const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const cartItemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p class="cart-item-meta">Size: ${item.size} | Qty: ${item.qty}</p>
              <div class="cart-item-actions">
                <span class="cart-item-price">₹${item.price * item.qty}</span>
                <button class="btn-remove" data-index="${index}">Remove</button>
              </div>
            </div>
          </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
      });
    }

    cartTotalPrice.innerText = `₹${total}`;
    cartBadge.innerText = count;

    // Attach remove listeners
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
    });
  };

  // Listen for 'Add to Cart' and 'Buy Now' clicks globally via event delegation
  document.addEventListener('click', (e) => {
    const isAddBtn = e.target.classList.contains('add-btn');
    const isBuyNowBtn = e.target.classList.contains('buy-now-btn');

    if (isAddBtn || isBuyNowBtn) {
      const card = e.target.closest('.menu-card') || e.target.closest('.artisan-card');
      
      let name, priceStr, size, image;

      if (card.classList.contains('menu-card')) {
        name = card.querySelector('h4').innerText;
        size = card.querySelector('.size-btn.active').getAttribute('data-size');
        priceStr = card.querySelector('.price-val').innerText;
        image = card.querySelector('.menu-img').getAttribute('src');
      } else if (card.classList.contains('artisan-card')) {
        name = card.querySelector('h4').innerText;
        size = "Premium";
        priceStr = card.querySelector('.price').innerText.replace('₹', '');
        image = card.querySelector('.artisan-img-wrapper img').getAttribute('src');
      }

      const price = parseFloat(priceStr);

      // Check if item exists in cart with same size
      const existing = cart.find(i => i.name === name && i.size === size);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, size, price, image, qty: 1 });
      }

      saveCart();
      renderCart();

      if (isBuyNowBtn) {
        // Direct to checkout
        closeCart();
        
        // Show qty input if it's a single item purchase
        if (cart.length === 1) {
          inputQty.classList.remove('hidden');
          inputQty.value = cart[0].qty;
        } else {
          inputQty.classList.add('hidden');
        }
        
        checkoutOverlay.classList.remove('hidden');
        showView(view0);
      } else {
        // Just open cart drawer
        openCart();
      }
    }
  });

  // UI Listeners
  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Checkout Modal Elements
  const checkoutOverlay = document.getElementById('checkout-overlay');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const view0 = document.getElementById('checkout-view-0');
  const view1 = document.getElementById('checkout-view-1');
  const view2 = document.getElementById('checkout-view-2');
  
  const btnRegisterCancel = document.getElementById('btn-register-cancel');
  const btnRegisterNext = document.getElementById('btn-register-next');
  const btnCod = document.getElementById('btn-cod');
  const btnOnline = document.getElementById('btn-online');
  const btnConfirmOrder = document.getElementById('btn-confirm-order');
  
  const inputName = document.getElementById('checkout-name');
  const inputEmail = document.getElementById('checkout-email');
  const inputMobile = document.getElementById('checkout-mobile');
  const inputAddress = document.getElementById('checkout-address');
  const inputPincode = document.getElementById('checkout-pincode');
  const inputQty = document.getElementById('checkout-qty');
  const inputOtp = document.getElementById('checkout-otp');

  const view3 = document.getElementById('checkout-view-3');

  const showView = (view) => {
    view0.classList.add('hidden');
    view1.classList.add('hidden');
    view2.classList.add('hidden');
    view3.classList.add('hidden');
    view.classList.remove('hidden');
  };

  const closeCheckoutModal = () => {
    checkoutOverlay.classList.add('hidden');
    // Reset views and inputs for next time
    setTimeout(() => {
      showView(view0);
      inputName.value = '';
      inputEmail.value = '';
      inputMobile.value = '';
      inputAddress.value = '';
      inputPincode.value = '';
      inputOtp.value = '';
    }, 300);
  };

  const playSuccessSound = () => {
    try {
      const audio = new Audio('success.mp3');
      audio.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  // Custom Toast Notification System
  const toastContainer = document.getElementById('toast-container');
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = "ℹ️";
    if (type === 'success') icon = "✅";
    if (type === 'error') icon = "❌";
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    // Auto remove after animation completes (3.4s)
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 3500);
  };

  paymentBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast("Your cart is empty. Please add items before checking out.", "error");
      return;
    }
    // Close cart and open checkout modal
    closeCart();
    
    // Hide qty input for multi-item cart checkouts
    if (cart.length > 1) {
      inputQty.classList.add('hidden');
    } else {
      inputQty.classList.remove('hidden');
      inputQty.value = cart[0].qty;
    }
    
    checkoutOverlay.classList.remove('hidden');
    showView(view0);
  });

  closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) closeCheckoutModal();
  });

  // Flow Step 0 (Register)
  btnRegisterCancel.addEventListener('click', closeCheckoutModal);

  btnRegisterNext.addEventListener('click', () => {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const mobile = inputMobile.value.trim();
    const address = inputAddress.value.trim();
    const pincode = inputPincode.value.trim();
    
    if (!name || !email || !mobile || !address || !pincode) {
      showToast("Please fill in all details.", "error");
      return;
    }

    // Update single-item quantity if changed
    if (cart.length === 1 && !inputQty.classList.contains('hidden')) {
      const qtyVal = parseInt(inputQty.value, 10);
      if (qtyVal > 0) {
        cart[0].qty = qtyVal;
        saveCart();
        renderCart(); // to update totals internally
      }
    }
    
    showView(view1);
  });

  // Flow Step 1 (Payment Method & Send OTP)
  let generatedOtp = "";

  btnCod.addEventListener('click', async () => {
    const email = inputEmail.value.trim();
    
    // Generate 6-digit OTP
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Show temporary toast
    showToast("Sending OTP...", "info");

    try {
      const response = await fetch('http://localhost:3001/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, otp: generatedOtp })
      });
      const data = await response.json();
      
      if (data.success) {
        showToast(`OTP successfully sent to ${email}`, "success");
        showView(view2);
        
        // Auto-fill and confirm
        inputOtp.value = generatedOtp;
        setTimeout(() => btnConfirmOrder.click(), 1000);
      } else {
        throw new Error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      showToast("Error sending OTP. Make sure backend is running on port 3001.", "error");
      // Fallback for testing UI without backend
      showToast(`(Mock) Your OTP is: ${generatedOtp}`, "success");
      showView(view2);
      
      // Auto-fill and confirm
      inputOtp.value = generatedOtp;
      setTimeout(() => btnConfirmOrder.click(), 1000);
    }
  });

  btnOnline.addEventListener('click', () => {
    showToast("Online Payment is coming soon! Please use Cash on Delivery.", "error");
  });

  // Flow Step 2 (Final - Verify OTP)
  btnConfirmOrder.addEventListener('click', async () => {
    const userOtp = inputOtp.value.trim();
    
    if (userOtp !== generatedOtp) {
      showToast("Invalid OTP. Please try again.", "error");
      return;
    }
    
    const originalText = btnConfirmOrder.innerText;
    btnConfirmOrder.innerText = "Confirming...";
    btnConfirmOrder.disabled = true;

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    // Create order string
    const coffee_order = cart.map(item => `${item.qty}x ${item.size} ${item.name}`).join(', ');
    const quantity = cart.reduce((sum, item) => sum + item.qty, 0).toString();
    
    const nameVal = inputName.value.trim() || "Guest User";
    const mobileVal = inputMobile.value.trim();
    const emailVal = inputEmail.value.trim();
    const addressVal = inputAddress.value.trim() || "In-store pickup";
    const pincodeVal = inputPincode.value.trim();
    
    try {
      const response = await fetch('http://localhost:3001/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          mobile: mobileVal,
          email: emailVal,
          address: addressVal,
          pincode: pincodeVal,
          payment_method: "Cash on Delivery",
          coffee_order: coffee_order,
          quantity: quantity,
          price: `₹${total}`,
          date: new Date().toISOString()
        })
      });
      
      // Even if it fails (backend down), we'll let the user succeed in UI for this demo
    } catch(err) {
      console.log("Order API error:", err);
    }

    // Play Sound & Vibrate
    playSuccessSound();
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Vibrate pattern
    }

    // Populate Order Summary
    const greetingNameEl = document.getElementById('success-greeting-name');
    if (greetingNameEl) {
      greetingNameEl.innerText = `Hi, ${nameVal}!`;
    }
    document.getElementById('summary-name').innerText = nameVal;
    document.getElementById('summary-mobile').innerText = mobileVal;
    document.getElementById('summary-email').innerText = emailVal;
    document.getElementById('summary-address').innerText = addressVal;
    document.getElementById('summary-pincode').innerText = pincodeVal;
    document.getElementById('summary-qty').innerText = quantity;
    document.getElementById('summary-price').innerText = `₹${total}`;
    
    // Format date nicely
    const orderDate = new Date();
    document.getElementById('summary-date').innerText = orderDate.toLocaleString();

    // Clear Cart
    cart = [];
    saveCart();
    renderCart();

    // Show Success View (View 3)
    showView(view3);
    
    btnConfirmOrder.innerText = originalText;
    btnConfirmOrder.disabled = false;
  });

  // Flow Step 4 (Return to Menu)
  const btnReturnMenu = document.getElementById('btn-return-menu');
  if (btnReturnMenu) {
    btnReturnMenu.addEventListener('click', closeCheckoutModal);
  }

  // Initial render for badge count
  renderCart();

  // ==========================================
  // Order Status Logic
  // ==========================================
  const orderStatusBtn = document.getElementById('order-status-btn');
  const statusOverlay = document.getElementById('status-overlay');
  const closeStatusBtn = document.getElementById('close-status-btn');
  const btnCheckStatus = document.getElementById('btn-check-status');
  const btnStatusDone = document.getElementById('btn-status-done');
  
  const statusView0 = document.getElementById('status-view-0');
  const statusView1 = document.getElementById('status-view-1');
  const statusError = document.getElementById('status-error');

  const closeStatusModal = () => {
    statusOverlay.classList.add('hidden');
    setTimeout(() => {
      statusView1.classList.add('hidden');
      statusView0.classList.remove('hidden');
      document.getElementById('status-name').value = '';
      document.getElementById('status-mobile').value = '';
      statusError.style.display = 'none';
    }, 300);
  };

  if (orderStatusBtn) {
    orderStatusBtn.addEventListener('click', () => {
      statusOverlay.classList.remove('hidden');
    });
  }

  if (closeStatusBtn) closeStatusBtn.addEventListener('click', closeStatusModal);
  if (btnStatusDone) btnStatusDone.addEventListener('click', closeStatusModal);
  if (statusOverlay) {
    statusOverlay.addEventListener('click', (e) => {
      if (e.target === statusOverlay) closeStatusModal();
    });
  }

  if (btnCheckStatus) {
    btnCheckStatus.addEventListener('click', async () => {
      const name = document.getElementById('status-name').value.trim();
      const mobile = document.getElementById('status-mobile').value.trim();

      if (!name || !mobile) {
        statusError.innerText = "Please enter Name and Mobile number.";
        statusError.style.display = 'block';
        return;
      }

      statusError.style.display = 'none';
      const originalText = btnCheckStatus.innerText;
      btnCheckStatus.innerText = "Searching...";
      btnCheckStatus.disabled = true;

      try {
        const response = await fetch(`http://localhost:3001/api/order-status?name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}`);
        const data = await response.json();

        if (data.success && data.order) {
          // Populate results
          document.getElementById('res-name').innerText = data.order.name || '';
          document.getElementById('res-mobile').innerText = data.order.mobile || '';
          document.getElementById('res-email').innerText = data.order.email || '';
          document.getElementById('res-address').innerText = data.order.address || '';
          document.getElementById('res-pincode').innerText = data.order.pincode || '';
          document.getElementById('res-qty').innerText = data.order.quantity || '';
          document.getElementById('res-price').innerText = data.order.price || '';
          
          if (data.order.date) {
            const dateObj = new Date(data.order.date);
            document.getElementById('res-date').innerText = dateObj.toLocaleString();
          }

          // Switch views
          statusView0.classList.add('hidden');
          statusView1.classList.remove('hidden');
        } else {
          statusError.innerText = data.error || "Order not found.";
          statusError.style.display = 'block';
        }
      } catch (err) {
        console.error(err);
        statusError.innerText = "Error searching. Make sure backend is running.";
        statusError.style.display = 'block';
      } finally {
        btnCheckStatus.innerText = originalText;
        btnCheckStatus.disabled = false;
      }
    });
  }

  // ==========================================
  // Three Dot Menu Logic
  // ==========================================
  const threeDotBtn = document.getElementById('three-dot-menu-btn');
  const threeDotDropdown = document.getElementById('three-dot-dropdown');

  if (threeDotBtn && threeDotDropdown) {
    threeDotBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      threeDotDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!threeDotDropdown.contains(e.target) && e.target !== threeDotBtn) {
        threeDotDropdown.classList.add('hidden');
      }
    });
  }

  // Dropdown Actions
  const dropdownOrderDetails = document.getElementById('dropdown-order-details');
  if (dropdownOrderDetails) {
    dropdownOrderDetails.addEventListener('click', (e) => {
      e.preventDefault();
      statusOverlay.classList.remove('hidden');
      threeDotDropdown.classList.add('hidden');
    });
  }

  const dropdownCart = document.getElementById('dropdown-cart');
  if (dropdownCart) {
    dropdownCart.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
      threeDotDropdown.classList.add('hidden');
    });
  }

  const dropdownCancelOrder = document.getElementById('dropdown-cancel-order');
  if (dropdownCancelOrder) {
    dropdownCancelOrder.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Cancel Order functionality coming soon!", "info");
      threeDotDropdown.classList.add('hidden');
    });
  }

  const dropdownCompleteOrder = document.getElementById('dropdown-complete-order');
  if (dropdownCompleteOrder) {
    dropdownCompleteOrder.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Complete Order functionality coming soon!", "info");
      threeDotDropdown.classList.add('hidden');
    });
  }

});
