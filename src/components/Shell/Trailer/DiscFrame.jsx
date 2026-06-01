import React from 'react';
import './DiscFrame.scss';

export const DiscFrame = ({ type, paused, extraClass = "" }) => {
  return (
    <div className={`disc-frame ${type} ${paused ? 'is-paused' : ''} ${extraClass}`}>
      <div className="atmospheric-glow" />
      
      {/* Randomized Solar Rays */}
      {type === 'grab' && [...Array(12)].map((_, i) => (
        <div key={i} className="solar-rays" style={{ '--deg': `${i * 30 + Math.random() * 10}deg` }} />
      ))}

      <div className="sun-container">
        <div className="rainbow-halo" />
        <div className="sun-core" />
      </div>

      {/* Extreme Light Leaks */}
      {type === 'grab' && <div className="light-leak-bloom" />}
    </div>
  );
};
