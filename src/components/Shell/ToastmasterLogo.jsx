import React from 'react';

export const ToastmasterLogo = ({ style = {} }) => (
  <div className="logo-wrap" style={{ color: 'inherit', width: 24, height: 24, ...style }}>
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* Heavy Blocky 'T' Shape */}
      <path d="M5 15h90v15H60v55H40V30H5V15z" />
      {/* Depth Shadow */}
      <path d="M10 20l80 0v5l-80 0z" opacity="0.3" fill="#000" />
    </svg>
  </div>
);