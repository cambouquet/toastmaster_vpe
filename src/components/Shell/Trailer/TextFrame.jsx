import React from 'react';
import { CyberGrid } from './CyberGrid';

export const TextFrame = ({ scene, content, color, effect }) => (
  <div className={`text-frame effect-${effect}`} key={scene}>
    {effect === 'cyber' && <CyberGrid />}
    <span className={`cinematic-text color-${color || 'white'}`}>
      {content}
    </span>
  </div>
);
