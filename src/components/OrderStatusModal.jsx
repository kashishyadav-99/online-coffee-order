import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OrderStatusModal({ isOpen, onClose, showToast }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (!name || !mobile) {
      showToast('Please enter both name and mobile number', 'error');
      return;
    }

    setLoading(true);
    setError('');
    setMatchedOrder(null);

    try {
      const res = await fetch(`/api/order-status?name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}`);
      const data = await res.json();

      if (data.success && data.order) {
        setMatchedOrder(data.order);
      } else {
        setError(data.error || 'No matching order found for these details.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to fetch order status. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '500px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={20} style={{ color: 'var(--primary-color)' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>Track Order Status</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchOrder} style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label>Name used in order</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g. 9876543210"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            {loading ? 'Searching...' : 'Check Status'}
          </button>
        </form>

        {/* Results view */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              borderRadius: '8px',
              color: 'var(--danger)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {matchedOrder && (
          <div
            style={{
              background: 'rgba(205, 164, 94, 0.08)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--success)',
                fontWeight: 600,
                marginBottom: '14px',
                fontSize: '1rem'
              }}
            >
              <CheckCircle2 size={20} /> Order Active & In Preparation
            </div>

            <div style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
              <p><strong>Customer:</strong> {matchedOrder.name}</p>
              <p><strong>Mobile:</strong> {matchedOrder.mobile}</p>
              <p><strong>Coffee Order:</strong> {matchedOrder.coffee_order}</p>
              <p><strong>Total Price:</strong> <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{matchedOrder.price}</span></p>
              <p><strong>Payment Method:</strong> {matchedOrder.payment_method}</p>
              <p><strong>Delivery Address:</strong> {matchedOrder.address}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> Order Date: {matchedOrder.date}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
