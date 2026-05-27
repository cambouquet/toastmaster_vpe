import React from 'react';
import './TimerTool.scss';

export const TimerTool = ({ activeIdx, time, setTime, running, setRunning, getTarget, format, state, onAction }) => (
  <div className="tool-item">
    <div className="tool-header">
      <span className="tool-label">TIMER ({getTarget()})</span>
    </div>
    <div className="timer-row">
      <div className="timer-click-zone clickable" onClick={() => setRunning(!running)}>
        <span className="timer-display centering">{format(time)}</span>
      </div>
      <button className="reset-btn" onClick={(e) => { e.stopPropagation(); setTime(0); setRunning(false); onAction('TIMER_RESET'); }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
    <input className="tool-input" placeholder="Timing observations..." 
           value={state[`time-${activeIdx}-n`] || ''} 
           onChange={e => onAction(`time-${activeIdx}-n`, e.target.value)} />
  </div>
);

