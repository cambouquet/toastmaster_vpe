import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const ToastmasterLogo = ({ className = "", style = {} }) => {
  const kGlyph = K_FONT_LIBRARY.K;
  const paths = kGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-tm-wrap ${className}`} 
      style={{ ...style, display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
      
      {/* Freedom Fighter K */}
      <svg viewBox="0 0 50 80" style={{ height: '80%', width: 'auto' }}>
        {paths.map((p, i) => (
          <path key={i} d={p} fill={i === 1 ? "#ff0044" : "#00bac4"} className={i === 1 ? 'kfont-wing' : ''} />
        ))}
      </svg>

      <span style={{ color: '#00bac4', fontSize: '12px', opacity: 0.4, fontFamily: 'var(--font-technical)' }}>//</span>

      {/* Mirrored Freedom Fighter K */}
      <svg viewBox="0 0 50 80" style={{ height: '80%', width: 'auto', transform: 'scaleX(-1)' }}>
        {paths.map((p, i) => (
          <path key={i} d={p} fill={i === 1 ? "#ff0044" : "#00bac4"} className={i === 1 ? 'kfont-wing' : ''} />
        ))}
      </svg>
    </div>
  );
};