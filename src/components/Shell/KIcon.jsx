import React from 'react';
import { K_FONT_LIBRARY } from './KFontLibrary';

const DEFAULT_ACCENT = import.meta.env.VITE_WING_COLOR || '#ff0055';

export const KIcon = ({ char, color = '#ffffff', accentColor = DEFAULT_ACCENT, ...props }) => {
  const glyph = K_FONT_LIBRARY[char] || K_FONT_LIBRARY['0'];
  const paths = glyph.path.split(' Z').filter(p => p.trim()).map(p => p + ' Z');
  
  return (
    <div {...props}>
      <svg viewBox={`0 0 ${glyph.width} 80`} style={{ height: '100%', width: '100%' }}>
        {paths.map((p, i) => {
          const isAccent = 
            ((char === 'T' || char === 'F' || char === 'K') && (i === 1 || i === 2)) ||
            (char === 'H' && i >= 2) ||
            (char === 'W' && i < 2);
          return (
            <path key={i} d={p} 
              fill={isAccent ? accentColor : color} 
              className={isAccent ? 'kfont-wing' : ''} />
          );
        })}
      </svg>
    </div>
  );
};
