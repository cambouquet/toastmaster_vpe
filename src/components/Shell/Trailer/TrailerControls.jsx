import React from 'react';
import { TRAILER_SCENES } from './TrailerScenes';
import './TrailerControls.scss';

export const TrailerControls = ({ current, onJump, repeat, onToggleRepeat, paused, onTogglePause }) => {
  const progress = (current / (TRAILER_SCENES.length - 1)) * 100;

  return (
    <div className="trailer-controls">
      <div className="track-row" onClick={(e) => e.stopPropagation()}>
        <button onClick={onTogglePause} className="ctrl-btn play-btn">
          {paused ? '▶' : '||'}
        </button>
        <div className="track" style={{ '--progress': `${progress}%` }}>
          {TRAILER_SCENES.map((_, i) => (
            <div 
              key={i} 
              className={`step ${i === current ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onJump(i); }}
            />
          ))}
          <div className="playhead-slider" />
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
};
