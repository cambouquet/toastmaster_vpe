import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const TypeFoundryLogo = ({ className = '', style = {} }) => {
  const kGlyph = K_FONT_LIBRARY.K;
  const paths = kGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-kanji-wrap is-red ${className}`} style={{ ...style, filter: 'drop-shadow(0 0 2px #ff0044)' }}>
      <svg viewBox='0 0 50 80' style={{ width: '95%', height: '95%' }}>
        {paths.map((p, i) => (
          <path key={i} d={p} fill={i === 1 ? "#ff0044" : "#ffffff"} className={i === 1 ? 'kfont-wing' : ''} />
        ))}
      </svg>
    </div>
  );
};