import React from 'react';
export const TextFrame = ({ scene, content, color }) => (
  <div className="text-frame" key={scene}>
    <span className={`cinematic-text color-${color || 'white'}`}>
      {content}
    </span>
  </div>
);
