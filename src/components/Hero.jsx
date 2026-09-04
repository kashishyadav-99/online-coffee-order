import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onExploreMenu, onTrackOrder }) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 20px 60px',
        background: "linear-gradient(rgba(13, 13, 13, 0.7), rgba(13, 13, 13, 0.9)), url('/images/coffee_hero_1784454797890.png') no-repeat center center / cover",
        marginTop: 0
      }}
    >
      <div style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(205, 164, 94, 0.12)',
            border: '1px solid var(--border-color)',
            padding: '6px 16px',
            borderRadius: '20px',
            color: 'var(--primary-color)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}
        >
          <Sparkles size={16} />
          Handcrafted Specialty Coffee
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.5px'
          }}
        >
          Experience Exceptional <br />
          <span style={{ color: 'var(--primary-color)' }}>Artisan Coffee</span>
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '32px',
            maxWidth: '620px',
            margin: '0 auto 32px'
          }}
        >
          Freshly roasted 100% Arabica beans, brewed to perfection. Order online for instant pickup or fast delivery.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={onExploreMenu}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Explore Menu <ArrowRight size={18} />
          </button>

          <button
            onClick={onTrackOrder}
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Track My Order
          </button>
        </div>
      </div>
    </section>
  );
}
