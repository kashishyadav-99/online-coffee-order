import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Trash2, LogOut, Lock, RefreshCw } from 'lucide-react';

export default function AdminPortalModal({ isOpen, onClose, showToast }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsAuthenticated(true);
      setError('');
      showToast('Admin logged in successfully', 'success');
      fetchOrders();
    } else {
      setError('Incorrect admin password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch order history from backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (index) => {
    if (!window.confirm('Are you sure you want to delete this customer order?')) return;

    try {
      const res = await fetch(`/api/orders/${index}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Order deleted successfully', 'success');
        fetchOrders();
      } else {
        showToast('Failed to delete order', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error connecting to backend API', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '850px' }}>
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
            <ShieldCheck size={22} style={{ color: 'var(--primary-color)' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
              Admin Portal {isAuthenticated && '(Dashboard)'}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'rgba(231,76,60,0.3)' }}
              >
                <LogOut size={14} /> Logout
              </button>
            )}
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Login View */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} style={{ padding: '20px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Lock size={40} style={{ color: 'var(--primary-color)', marginBottom: '10px' }} />
              <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>Admin Access Required</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Enter the secret password to view customer orders.
              </p>
            </div>

            <div className="form-group" style={{ maxWidth: '340px', margin: '0 auto 16px' }}>
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="form-input"
                autoFocus
              />
            </div>

            {error && (
              <p style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '16px' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ maxWidth: '340px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}
            >
              Unlock Dashboard
            </button>
          </form>
        ) : (
          /* Dashboard View: Order Table */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Total Stored Orders: <strong>{orders.length}</strong>
              </span>
              <button
                onClick={fetchOrders}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh List
              </button>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No customer orders placed yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.85rem',
                    textAlign: 'left'
                  }}
                >
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--primary-color)' }}>
                      <th style={{ padding: '10px 12px' }}>Name</th>
                      <th style={{ padding: '10px 12px' }}>Mobile</th>
                      <th style={{ padding: '10px 12px' }}>Order Details</th>
                      <th style={{ padding: '10px 12px' }}>Price</th>
                      <th style={{ padding: '10px 12px' }}>Payment</th>
                      <th style={{ padding: '10px 12px' }}>Address</th>
                      <th style={{ padding: '10px 12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord, idx) => (
                      <tr
                        key={idx}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{ord.name}</td>
                        <td style={{ padding: '10px 12px' }}>{ord.mobile}</td>
                        <td style={{ padding: '10px 12px' }}>{ord.coffee_order}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--primary-color)', fontWeight: 600 }}>{ord.price}</td>
                        <td style={{ padding: '10px 12px' }}>{ord.payment_method}</td>
                        <td style={{ padding: '10px 12px', maxWidth: '180px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {ord.address}, {ord.pincode}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <button
                            onClick={() => handleDeleteOrder(idx)}
                            style={{
                              background: 'rgba(231,76,60,0.15)',
                              border: '1px solid rgba(231,76,60,0.3)',
                              color: 'var(--danger)',
                              padding: '5px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.78rem'
                            }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
