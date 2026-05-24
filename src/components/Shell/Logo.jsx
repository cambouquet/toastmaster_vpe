import React from 'react';

export const Logo = ({ scan }) => (
  <div className={`logo-wrap ${scan ? 'scan' : ''}`} style={{ cursor: 'default' }}>
    <svg viewBox="0 0 100 100" fill="currentColor">
      <path d="M5 15h90v15H60v55H40V30H5V15z" />
      <path d="M10 20l80 0v5l-80 0z" opacity="0.3" fill="#000" />
    </svg>
  </div>
);
