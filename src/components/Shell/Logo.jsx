import React from 'react';

export const Logo = ({ scan, className = "", style = {} }) => (
  <div 
    className={`logo-wrap ${scan ? 'scan' : ''} ${className}`} 
    style={{ color: 'inherit', position: 'relative', ...style }}
  >
    {scan && <div className="logo-ghost" style={{ position: 'absolute', inset: 0, opacity: 0.3, color: '#ff00ff', transform: 'translateX(-1px)' }}>
      <svg viewBox="0 0 100 100" fill="currentColor"><path d="M19 95 L22 5 L25 95 Z" /><path d="M25 40 Q65 5 96 22 L38 52 Z" /><path d="M17 52 L31 66 L27 70 L13 56 Z" /><path d="M25 63 Q65 85 98 98 L88 98 Q58 85 25 68 Z" /></svg>
    </div>}
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
      <path d="M19 95 L22 5 L25 95 Z" />
      <path d="M25 40 Q65 5 96 22 L38 52 Z" />
      <path d="M17 52 L31 66 L27 70 L13 56 Z" />
      <path d="M25 63 Q65 85 98 98 L88 98 Q58 85 25 68 Z" />
      <circle cx="22" cy="45" r="2.5" fill="#000" opacity="0.4" />
      <path d="M45 40l12 2.5v1.5l-12-2.5z" fill="#000" opacity="0.3" />
    </svg>
  </div>
);
