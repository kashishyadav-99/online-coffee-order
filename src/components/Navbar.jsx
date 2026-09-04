import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ShieldCheck, Coffee, Phone, MessageSquare } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onOpenOrderStatus,
  onNavigateSection
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          padding: '16px 5%',
          background: scrolled ? 'rgba(13, 13, 13, 0.95)' : 'rgba(13, 13, 13, 0.75)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigateSection('home'); }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            color: 'var(--primary-color)',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Coffee size={24} style={{ color: 'var(--primary-color)' }} />
          ARTISAN COFFEE
        </a>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              margin: 0,
              padding: 0
            }}
          >
            <li>
              <a
                href="#menu"
                onClick={(e) => { e.preventDefault(); onNavigateSection('menu'); }}
                style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); onNavigateSection('contact'); }}
                style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onOpenOrderStatus}
              className="btn-secondary"
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
              title="Track your order status"
            >
              <Search size={14} />
              Track Order
            </button>

            <button
              onClick={onOpenAdmin}
              className="btn-secondary"
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
              title="Admin Portal"
            >
              <ShieldCheck size={14} />
              Admin
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                background: 'rgba(205, 164, 94, 0.12)',
                border: '1px solid var(--border-color)',
                color: 'var(--primary-color)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              title="View Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--primary-color)',
                    color: '#0d0d0d',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Action Buttons */}
      <div className="floating-fab-container">
        <a
          href="tel:+918291818710"
          className="fab-icon-btn fab-call"
          aria-label="Call us"
          title="Call +91 82918 18710"
        >
          <Phone size={24} />
        </a>
        <a
          href="https://wa.me/918291818710?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Artisan%20Coffee."
          target="_blank"
          rel="noopener noreferrer"
          className="fab-icon-btn fab-whatsapp"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageSquare size={24} />
        </a>
      </div>
    </>
  );
}
