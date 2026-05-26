import React from 'react';
import { KFontText } from './KFontText';

export const KIdBrand = ({ className = '', text = 'K-ID' }) => (
  <div className={`k-id-brand-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
    <svg viewBox='0 0 80 80' fill='#00bac4' style={{ height: '50px', width: '50px', flexShrink: 0 }}>
      <path d='M12 76 L15 4 L18 76 Z' />
      <path d='M18 32 Q50 4 75 18 L28 42 Z' />
      <path d='M10 42 L21 53 L18 56 L7 45 Z' />
      <path d='M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z' />
    </svg>
    <div className='brand-text-sync' style={{ display: 'flex', gap: '4px' }}>
      {text.split('').map((char, i) => (
        <KFontText key={i} text={char} height={40} color="#00bac4" />
      ))}
    </div>
  </div>
);
