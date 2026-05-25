import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

export const TypeFoundryLogo = ({ className = '', style = {} }) => {
  const fGlyph = K_FONT_LIBRARY.F;
  // fGlyph.path: `${TOWER(8)} ${SW(4, 44, 10)} ${SW(34, 38, 10)}`
  // TOWER(8) has 1 subpath
  // SW(4, 44, 10) has 2 subpaths (Handle + Blade)
  // SW(34, 38, 10) has 2 subpaths (Handle + Blade)
  const paths = fGlyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');

  return (
    <div className={`logo-kanji-wrap is-white ${className}`} style={style}>
      <svg viewBox='0 0 50 80' style={{ width: '95%', height: '95%' }}>
        <defs>
          <filter id="red-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feFlood floodColor="#ff0044" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {/* Stem */}
          <path d={paths[0]} fill="#ffffff" />
          
          {/* Top Saber (Highlight) */}
          <path d={paths[1]} fill="#ff0044" filter="url(#red-glow)" />
          <path d={paths[2]} fill="#ff0044" filter="url(#red-glow)" />
          
          {/* Middle Saber (Back to White) */}
          <path d={paths[3]} fill="#ffffff" />
          <path d={paths[4]} fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};