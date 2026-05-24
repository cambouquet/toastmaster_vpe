import React from 'react';

export const Logo = ({ scan, className = "", style = {} }) => (
  <div 
    className={`logo-wrap ${scan ? 'scan' : ''} ${className}`} 
    style={{ color: 'inherit', ...style }}
  >
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* Blocky 'K' Shape */}
      <path d="M10 10h18v80H10z" />
      <path d="M28 42L70 10h20L43 50z" />
      <path d="M43 50l47 40H70L28 58z" />
      {/* Neural Glitch Cuts */}
      <path d="M10 30h20v4H10z M10 66h10v3H10z" opacity="0.6" fill="#000" />
      <path d="M55 20l10-8v5l-10 8z" opacity="0.4" fill="#000" />
    </svg>
  </div>
);
