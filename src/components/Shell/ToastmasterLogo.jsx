import React from 'react';

export const ToastmasterLogo = ({ className = "", style = {} }) => (
  <div className={`logo-tm-wrap ${className}`} 
    style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 100 110" fill="currentColor" style={{ width: '100%', height: '100%' }}>
      <path d="M5 25h90v15H60v55H40V40H5V25z" />
      <path d="M10 30l80 0v5l-80 0z" opacity="0.3" fill="#000" />
    </svg>
  </div>
);