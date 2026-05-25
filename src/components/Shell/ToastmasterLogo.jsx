import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const ToastmasterLogo = ({ className = "", style = {} }) => {
  const tGlyph = K_FONT_LIBRARY.T;
  // T: `${LS(4, 46, 25)} ${TOWER(22, 12)}`
  // LS returns 3 sub-paths: Middle handle, Right blade, Left blade
  const paths = tGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-tm-wrap ${className}`} 
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 50 80" style={{ width: '100%', height: '100%' }}>
        <defs>
          <filter id="tm-cyan-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feFlood floodColor="#00bac4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="#00bac4" filter="url(#tm-cyan-glow)">
          {paths.map((p, i) => <path key={i} d={p} />)}
        </g>
      </svg>
    </div>
  );
};