import React from 'react';
import { TRAILER_SCENES } from './TrailerScenes';

export const TrailerControls = ({ current, onJump, paused, onTogglePause, repeat, onToggleRepeat }) => (
  <div className="trailer-controls">
    <div className="track-row">
      <div className="track">
        {TRAILER_SCENES.map((s, i) => (
          <div 
            key={i} 
            className={`step ${i === current ? 'active' : ''} type-${s.type}`}
            onClick={() => onJump(i)}
          />
        ))}
      </div>
      <button onClick={onToggleRepeat} className={`ctrl-btn loop-btn ${repeat ? 'active' : ''}`}>∞</button>
    </div>
    <input 
      type="range" min="0" max={TRAILER_SCENES.length - 1} 
      value={current} onChange={(e) => onJump(parseInt(e.target.value))}
    />
  </div>
);
