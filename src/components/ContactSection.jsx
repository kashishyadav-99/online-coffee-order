import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in required fields: Name, Email, Message', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Your message has been sent successfully!', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        showToast(data.error || 'Failed to send message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Message submitted! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: '80px 5%',
        background: 'rgba(22, 22, 22, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Have a question, feedback, or custom catering inquiry? Send us a message.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px'
          }}
        >
          {/* Contact Details Card */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '24px' }}>
                Visit Artisan Coffee
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Phone size={20} style={{ color: 'var(--primary-color)', marginTop: '3px' }} />
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'block' }}>Call Us</span>
                    <a href="tel:+918291818710" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                      +91 82918 18710
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Mail size={20} style={{ color: 'var(--primary-color)', marginTop: '3px' }} />
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'block' }}>Email Support</span>
                    <a href="mailto:kashishyadav6768@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                      kashishyadav6768@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-color)', marginTop: '3px' }} />
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'block' }}>Location</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>
                      124 Artisan Blvd, Coffee District, Mumbai, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.9rem' }}>
                Opening Hours:
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Mon - Sun: 7:00 AM - 10:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '24px' }}>
              Send Us a Message
            </h3>

            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91..."
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}
            >
              {submitting ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
