import React from 'react';
export const TextFrame = ({ scene, content, color, effect }) => (
  <div className={`text-frame effect-${effect}`} key={scene}>
    <span className={`cinematic-text color-${color || 'white'}`}>
      {content}
    </span>
  </div>
);
