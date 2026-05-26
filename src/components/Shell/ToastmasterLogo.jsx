import React from 'react';
import { Logo } from './Logo';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const ToastmasterLogo = ({ className = "", style = {} }) => {
  const tGlyph = K_FONT_LIBRARY.T;
  const paths = tGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-tm-wrap ${className}`} 
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      
      {/* Toastmaster T - Blue Pillar with Red Accents */}
      <svg viewBox="0 0 50 80" style={{ height: '100%', width: '100%', display: 'block' }}>
        {paths.map((p, i) => {
          // In T: 0=LS handle, 1=LS right blade, 2=LS left blade, 3=TOWER pillar
          const isAccent = i === 1 || i === 2;
          return (
            <path key={i} d={p} 
              fill={isAccent ? "#ff0044" : "#00bac4"} 
              className={isAccent ? 'kfont-wing' : ''} />
          );
        })}
      </svg>
    </div>
  );
};