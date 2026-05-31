import React from 'react';
import './CyberGrid.scss';

export const CyberGrid = () => (
  <div className="cyber-grid-container">
    <div className="v-world">
      <div className="grass-field" />
      <div className="f-grid" />
      <div className="city-scape">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="cube-building" 
            style={{ 
              '--i': i, 
              '--mod-i': i % 5,
              '--x': `${(i - 7) * 120}px`, 
              '--z': `${(i % 3) * -300}px` 
            }}
          >
            <div className="face f" />
            <div className="face r" />
            <div className="face b" />
            <div className="face l" />
            <div className="face t" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
