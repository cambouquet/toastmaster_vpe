import React from 'react';
import { Logo } from './Logo';

export const ToastmasterLogo = ({ className = "", style = {} }) => {
  return (
    <div className={`logo-tm-wrap ${className}`} 
      style={{ ...style, display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
      
      {/* Freedom Fighter Logo */}
      <Logo style={{ height: '80%', width: 'auto' }} />

      <span style={{ color: '#00bac4', fontSize: '12px', opacity: 0.4, fontFamily: 'var(--font-technical)' }}>//</span>

      {/* Mirrored Freedom Fighter Logo */}
      <Logo style={{ height: '80%', width: 'auto', transform: 'scaleX(-1)' }} />
    </div>
  );
};