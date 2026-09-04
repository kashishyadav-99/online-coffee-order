import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const num = parseFloat(item.displayPrice.replace(/[^0-9.]/g, '')) || 0;
      return sum + num * item.quantity;
    }, 0);
  };

  const symbol = cartItems.length > 0 && cartItems[0].displayPrice.startsWith('$') ? '$' : '₹';
  const totalAmount = calculateTotal().toFixed(2);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          background: 'var(--surface-color)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} style={{ color: 'var(--primary-color)' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>Your Coffee Cart</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Add some delicious coffee to get started!</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}-${index}`}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '2px' }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-color)', display: 'block', marginBottom: '6px' }}>
                    Size: {item.size} • {item.displayPrice}
                  </span>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: '#fff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: '#fff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger)',
                    cursor: 'pointer',
                    padding: '6px',
                    opacity: 0.7
                  }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '16px'
              }}
            >
              <span>Subtotal:</span>
              <span style={{ color: 'var(--primary-color)' }}>
                {symbol}{totalAmount}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onClearCart}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
              >
                Clear Cart
              </button>
              <button
                onClick={onProceedCheckout}
                className="btn-primary"
                style={{ flex: 2, justifyContent: 'center', padding: '12px' }}
              >
                Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
