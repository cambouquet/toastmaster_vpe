import React from 'react';

export const TimerTool = ({ activeIdx, time, setTime, running, setRunning, getTarget, format, state, onAction }) => (
  <div className="tool-item">
    <div className="tool-header">
      <span className="tool-label">TIMER ({getTarget()})</span>
      <div className="timer-btns">
        <button onClick={() => setRunning(!running)}>{running ? 'STOP' : 'START'}</button>
        <button onClick={() => { setTime(0); setRunning(false); }}>RESET</button>
      </div>
    </div>
    <div className="timer-row"><span className="timer-display">{format(time)}</span></div>
    <input className="tool-input" placeholder="Timing observations..." 
           value={state[`time-${activeIdx}-n`] || ''} 
           onChange={e => onAction(`time-${activeIdx}-n`, e.target.value)} />
  </div>
);
