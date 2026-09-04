import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={20} className="text-emerald-400" />,
    error: <AlertCircle size={20} className="text-rose-400" />,
    info: <Info size={20} className="text-amber-400" />,
  };

  const bgColors = {
    success: 'rgba(46, 204, 113, 0.15)',
    error: 'rgba(231, 76, 60, 0.15)',
    info: 'rgba(205, 164, 94, 0.15)',
  };

  const borderColors = {
    success: 'rgba(46, 204, 113, 0.3)',
    error: 'rgba(231, 76, 60, 0.3)',
    info: 'rgba(205, 164, 94, 0.3)',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        background: bgColors[toast.type] || bgColors.info,
        border: `1px solid ${borderColors[toast.type] || borderColors.info}`,
        backdropFilter: 'blur(12px)',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        fontSize: '0.92rem',
        animation: 'slideUp 0.3s ease-out forwards',
      }}
    >
      {icons[toast.type] || icons.info}
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#a0a0a0',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
