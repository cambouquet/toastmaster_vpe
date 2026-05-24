import React from 'react';

export const MissionControlLogo = ({ style = {} }) => (
  <div className="logo-wrap" style={{ color: 'inherit', width: 24, height: 24, ...style }}>
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* Central Command Core */}
      <path d="M40 40h20v20H40z" />
      {/* Orbital Brackets */}
      <path d="M10 30v-20h20 M70 10h20v20 M90 70v20h-20 M30 90h-20v-20" fill="none" stroke="currentColor" strokeWidth="6" />
      {/* Data Transmission Dots */}
      <circle cx="50" cy="15" r="4" /><circle cx="50" cy="85" r="4" />
      <circle cx="15" cy="50" r="4" /><circle cx="85" cy="50" r="4" />
      {/* Scanning Rings */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" opacity="0.3" />
    </svg>
  </div>
);