import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderStatusModal from './components/OrderStatusModal';
import ContactSection from './components/ContactSection';
import AdminPortalModal from './components/AdminPortalModal';
import Toast from './components/Toast';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('artisan-cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('artisan-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Active items for Checkout (Cart items OR single Buy Now item)
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Cart Operations
  const handleAddToCart = (item, size, displayPrice) => {
    const existingIndex = cartItems.findIndex(
      (i) => i.id === item.id && i.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          name: item.name,
          image: item.image,
          size: size,
          displayPrice: displayPrice,
          quantity: 1
        }
      ]);
    }

    showToast(`Added ${item.name} (${size}) to cart`, 'success');
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const handleRemoveFromCart = (index) => {
    const item = cartItems[index];
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    if (item) {
      showToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Cart cleared', 'info');
  };

  // Trigger Single Item Buy Now
  const handleBuyNow = (item, size, displayPrice) => {
    setCheckoutItems([
      {
        id: item.id,
        name: item.name,
        image: item.image,
        size: size,
        displayPrice: displayPrice,
        quantity: 1
      }
    ]);
    setIsCheckoutOpen(true);
  };

  // Trigger Cart Checkout
  const handleProceedCartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    // If order was placed from cart, clear cart
    if (checkoutItems === cartItems) {
      setCartItems([]);
    }
    showToast('Order placed successfully! Receipt generated.', 'success');
  };

  const handleNavigateSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="app-container" style={{ minHeight: '100vh', background: 'var(--bg-color)', color: '#fff' }}>
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrderStatus={() => setIsOrderStatusOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Sections */}
      <main style={{ paddingTop: '70px' }}>
        <Hero
          onExploreMenu={() => handleNavigateSection('menu')}
          onTrackOrder={() => setIsOrderStatusOpen(true)}
        />

        <Menu
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        <ContactSection showToast={showToast} />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: '#080808',
          padding: '40px 5%',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}
      >
        <p style={{ marginBottom: '8px' }}>
          © {new Date().getFullYear()} <strong style={{ color: 'var(--primary-color)' }}>Artisan Coffee</strong>. All rights reserved.
        </p>
        <p style={{ fontSize: '0.8rem' }}>
          Handcrafted with passion • Express Node.js & React Powered
        </p>
      </footer>

      {/* Modals & Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCartCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutItems={checkoutItems}
        onOrderSuccess={handleOrderSuccess}
        showToast={showToast}
      />

      <OrderStatusModal
        isOpen={isOrderStatusOpen}
        onClose={() => setIsOrderStatusOpen(false)}
        showToast={showToast}
      />

      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        showToast={showToast}
      />

      {/* Toast Alerts */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
