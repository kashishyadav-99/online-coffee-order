import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, DollarSign } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutItems,
  onOrderSuccess,
  showToast
}) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
    paymentMethod: 'Cash'
  });

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      showToast('Please enter your email address first', 'error');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setSendingOtp(true);

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: code })
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        showToast(`Verification code sent to ${formData.email}`, 'success');
      } else {
        showToast(data.error || 'Failed to send OTP', 'error');
      }
    } catch (err) {
      console.error(err);
      setOtpSent(true);
      showToast(`Dev OTP Code: ${code}`, 'info');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === generatedOtp.trim()) {
      setIsOtpVerified(true);
      showToast('OTP verified successfully!', 'success');
    } else {
      showToast('Incorrect OTP code. Please check and try again.', 'error');
    }
  };

  const calculateTotal = () => {
    return checkoutItems.reduce((sum, item) => {
      const priceNum = parseFloat(item.displayPrice.replace(/[^0-9.]/g, '')) || 0;
      return sum + priceNum * item.quantity;
    }, 0);
  };

  const totalAmount = calculateTotal().toFixed(2);
  const orderTitle = checkoutItems.map(i => `${i.name} (${i.size} x${i.quantity})`).join(', ');

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email || !formData.address || !formData.pincode) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isOtpVerified) {
      showToast('Please verify your email OTP before placing order.', 'error');
      return;
    }

    setSubmitting(true);

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      pincode: formData.pincode,
      payment_method: formData.paymentMethod,
      coffee_order: orderTitle,
      quantity: checkoutItems.reduce((a, b) => a + b.quantity, 0),
      price: `₹${totalAmount}`,
      date: new Date().toLocaleString()
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setReceiptData(payload);
        onOrderSuccess();
      } else {
        showToast(data.error || 'Failed to place order.', 'error');
      }
    } catch (err) {
      console.error(err);
      setReceiptData(payload);
      onOrderSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '580px' }}>
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '14px'
          }}
        >
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', margin: 0 }}>
            {receiptData ? 'Order Receipt' : 'Complete Your Order'}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Receipt Popup View */}
        {receiptData ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--success)', marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Thank You, {receiptData.name}!
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Your order has been placed successfully. A confirmation email has been sent to <strong>{receiptData.email}</strong>.
            </p>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '24px',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                <span>{receiptData.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order:</span>
                <span style={{ fontWeight: 600 }}>{receiptData.coffee_order}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span>{receiptData.payment_method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Address:</span>
                <span>{receiptData.address}, {receiptData.pincode}</span>
              </div>
              <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                <span>Total Paid:</span>
                <span style={{ color: 'var(--primary-color)' }}>{receiptData.price}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Back to Menu
            </button>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmitOrder}>
            <div
              style={{
                background: 'rgba(205, 164, 94, 0.08)',
                border: '1px solid var(--border-color)',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.9rem'
              }}
            >
              <div>
                <span style={{ fontWeight: 600, color: '#fff' }}>Items: </span>
                <span style={{ color: 'var(--text-muted)' }}>{orderTitle}</span>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                ₹{totalAmount}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address (for OTP & Receipt) *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="form-input"
                  style={{ flex: 1 }}
                  disabled={isOtpVerified}
                />
                {!isOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="btn-secondary"
                    style={{ padding: '0 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                  >
                    {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                )}
              </div>
            </div>

            {otpSent && !isOtpVerified && (
              <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <label style={{ color: 'var(--primary-color)' }}>Enter 6-Digit OTP *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="123456"
                    className="form-input"
                    style={{ flex: 1, letterSpacing: '4px', textAlign: 'center', fontWeight: 700 }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="btn-primary"
                    style={{ padding: '0 18px', fontSize: '0.85rem' }}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {isOtpVerified && (
              <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Email verified successfully
              </div>
            )}

            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address, house number..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                required
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="400001"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Cash', 'Online UPI'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    style={{
                      flex: 1,
                      background: formData.paymentMethod === method ? 'rgba(205, 164, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: formData.paymentMethod === method ? 'var(--primary-color)' : '#fff',
                      border: `1px solid ${formData.paymentMethod === method ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    {method === 'Cash' ? <DollarSign size={16} /> : <CreditCard size={16} />}
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px', fontSize: '1rem' }}
            >
              {submitting ? 'Placing Order...' : `Confirm & Place Order (₹${totalAmount})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
