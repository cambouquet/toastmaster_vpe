import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const TypeFoundryLogo = ({ className = '', style = {} }) => {
  const fGlyph = K_FONT_LIBRARY.F;
  const paths = fGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-kanji-wrap is-f ${className}`} style={{ ...style, filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))' }}>
      <svg viewBox='0 0 50 80' style={{ width: '100%', height: '100%' }}>
        {paths.map((p, i) => {
          // Path 1 & 2 are the sabers in F
          const isSaber = i === 1 || i === 2;
          return <path key={i} d={p} fill={isSaber ? "#ff0044" : "#ffffff"} style={isSaber ? { filter: 'drop-shadow(0 0 2px #ff0044)' } : {}} />;
        })}
      </svg>
    </div>
  );
};