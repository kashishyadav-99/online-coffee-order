/* ==========================================================================
   ARTISAN COFFEE — Site Config
   Edit the values in SITE_CONFIG below to update contact details site-wide.
   ========================================================================== */

const SITE_CONFIG = {
  // Phone number as shown to visitors
  phoneDisplay: '+91 82918 18710',
  // Same number, digits only (with country code, no spaces/+) — used for tel: and wa.me links
  phoneDigits: '918291818710',
  email: 'kashishyadav6768@gmail.com',
  whatsappMessage: "Hi! I'd like to know more about Artisan Coffee.",

  // ---- EmailJS settings (used by the contact form) ----
  // Sign up free at https://www.emailjs.com, create an Email Service + Template,
  // then paste your own IDs here. See README-CONTACT-FORM.md for step-by-step help.
  emailJsPublicKey: 'YOUR_PUBLIC_KEY',
  emailJsServiceId: 'YOUR_SERVICE_ID',
  emailJsTemplateId: 'YOUR_TEMPLATE_ID',
};

document.addEventListener('DOMContentLoaded', () => {
  fillPhoneNumbers();
  injectFloatingButtons();
});

/* Fill every .dynamic-phone element with a tel: link + formatted number */
function fillPhoneNumbers() {
  document.querySelectorAll('.dynamic-phone').forEach((el) => {
    el.href = `tel:+${SITE_CONFIG.phoneDigits}`;
    el.textContent = SITE_CONFIG.phoneDisplay;
  });
}

/* Add fixed Call + WhatsApp buttons to every page */
function injectFloatingButtons() {
  if (document.querySelector('.floating-contact-buttons')) return;

  const wrap = document.createElement('div');
  wrap.className = 'floating-contact-buttons';

  const waLink = `https://wa.me/${SITE_CONFIG.phoneDigits}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`;

  wrap.innerHTML = `
    <a href="tel:+${SITE_CONFIG.phoneDigits}" class="fab-btn fab-call" aria-label="Call us" title="Call ${SITE_CONFIG.phoneDisplay}">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
    </a>
    <a href="${waLink}" target="_blank" rel="noopener" class="fab-btn fab-whatsapp" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4zm4.6-6.3c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 4 3.4.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z"/></svg>
    </a>
  `;

  document.body.appendChild(wrap);

  const style = document.createElement('style');
  style.textContent = `
    .floating-contact-buttons {
      position: fixed;
      right: 26px;
      bottom: 90px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      z-index: 950;
    }
    .fab-btn {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
      transition: transform .25s ease;
    }
    .fab-btn:hover { transform: translateY(-3px) scale(1.05); }
    .fab-call { background: linear-gradient(135deg, #e6c766, #c9a227); color: #1a1209; }
    .fab-whatsapp { background: #25D366; }
    @media (max-width: 480px) {
      .floating-contact-buttons { right: 16px; bottom: 80px; gap: 10px; }
      .fab-btn { width: 48px; height: 48px; }
    }
  `;
  document.head.appendChild(style);
}
