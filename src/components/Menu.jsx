import React, { useState } from 'react';
import { menuData } from '../data/menuData';
import { Search, ShoppingBag, Zap, DollarSign, IndianRupee } from 'lucide-react';

export default function Menu({ onAddToCart, onBuyNow }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR'); // INR or USD
  const [selectedSizes, setSelectedSizes] = useState({}); // { [itemId]: 'Medium' }

  const exchangeRate = 0.012; // 1 INR ~ 0.012 USD

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const getSelectedSize = (item) => {
    return selectedSizes[item.id] || 'Medium';
  };

  const getPrice = (item) => {
    const size = getSelectedSize(item);
    const inrPrice = item.prices[size] || item.prices['Medium'] || 250;
    if (currency === 'USD') {
      return `$${(inrPrice * exchangeRate).toFixed(2)}`;
    }
    return `₹${inrPrice}`;
  };

  const categories = [
    { id: 'all', label: 'All Items' },
    ...menuData.map((c) => ({ id: c.categoryId, label: c.category }))
  ];

  const filteredData = menuData
    .map((cat) => {
      if (activeCategory !== 'all' && cat.categoryId !== activeCategory) {
        return null;
      }
      const items = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (items.length === 0) return null;
      return { ...cat, items };
    })
    .filter(Boolean);

  return (
    <section
      id="menu"
      style={{
        padding: '60px 5%',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      {/* Header & Controls */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.4rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
          Our Artisan Menu
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Select your favorite brew, customize size, and order instantly.
        </p>

        {/* Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '24px',
            flexWrap: 'wrap'
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              maxWidth: '380px',
              width: '100%'
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search coffee, drinks, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '40px',
                width: '100%',
                borderRadius: '25px',
                background: 'rgba(255,255,255,0.04)'
              }}
            />
          </div>

          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="btn-secondary"
            style={{ borderRadius: '25px', padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {currency === 'INR' ? <IndianRupee size={14} /> : <DollarSign size={14} />}
            Currency: {currency}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '36px',
          scrollbarWidth: 'none'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              background: activeCategory === cat.id ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat.id ? '#0d0d0d' : 'var(--text-light)',
              border: `1px solid ${activeCategory === cat.id ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Categories & Items Grid */}
      {filteredData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.2rem' }}>No items match "{searchQuery}"</p>
        </div>
      ) : (
        filteredData.map((catSection) => (
          <div key={catSection.categoryId} style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '1.6rem',
                color: 'var(--text-light)',
                marginBottom: '20px',
                borderLeft: '4px solid var(--primary-color)',
                paddingLeft: '12px'
              }}
            >
              {catSection.category}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {catSection.items.map((item) => {
                const currentSize = getSelectedSize(item);
                const displayPrice = getPrice(item);

                return (
                  <div
                    key={item.id}
                    className="glass-panel glow-hover"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Item Image */}
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(4px)',
                          color: 'var(--primary-color)',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        {displayPrice}
                      </span>
                    </div>

                    {/* Item Info */}
                    <div
                      style={{
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1
                      }}
                    >
                      <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>
                        {item.name}
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', flexGrow: 1 }}>
                        {item.ingredients}
                      </p>

                      {/* Size Selector */}
                      <div style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                          Select Size:
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {['Small', 'Medium', 'Large'].map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleSizeChange(item.id, sz)}
                              style={{
                                flex: 1,
                                background: currentSize === sz ? 'rgba(205, 164, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: currentSize === sz ? 'var(--primary-color)' : 'var(--text-muted)',
                                border: `1px solid ${currentSize === sz ? 'var(--primary-color)' : 'transparent'}`,
                                padding: '4px 0',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: currentSize === sz ? 600 : 400,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => onAddToCart(item, currentSize, displayPrice)}
                          className="btn-secondary"
                          style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.85rem' }}
                        >
                          <ShoppingBag size={15} /> Add to Cart
                        </button>
                        <button
                          onClick={() => onBuyNow(item, currentSize, displayPrice)}
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '0.85rem' }}
                        >
                          <Zap size={15} /> Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
