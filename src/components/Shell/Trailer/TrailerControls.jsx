import React from 'react';
import { TRAILER_SCENES } from './TrailerScenes';

export const TrailerControls = ({ current, onJump, repeat, onToggleRepeat, paused, onTogglePause }) => (
  <div className="trailer-controls">
    <div className="track-row" onClick={(e) => e.stopPropagation()}>
      <button onClick={onTogglePause} className="ctrl-btn play-btn">
        {paused ? '▶' : '||'}
      </button>
      <div className="track">
        {TRAILER_SCENES.map((_, i) => (
          <div 
            key={i} 
            className={`step ${i === current ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onJump(i); }}
          />
        ))}
      </div>
      <button 
        onClick={onToggleRepeat} 
        className={`ctrl-btn loop-btn ${repeat ? 'active' : ''}`}
      >
        ∞
      </button>
    </div>
  </div>
);
