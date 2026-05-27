import React from 'react';
import './FillerTool.scss';

export const FillerTool = ({ activeIdx, state, onAction }) => {
  const fillers = ['Ah', 'Uh', 'Um', 'So', 'And', 'Like', 'But', 'Repeat'];
  const ahKey = `ah-${activeIdx}`;
  const count = state[ahKey] || 0;
  const fs = state[`${ahKey}-fs`] || {};

  const up = (f) => {
    onAction(`${ahKey}-fs`, { ...fs, [f]: (fs[f] || 0) + 1 });
    onAction(ahKey, count + 1);
  };

  return (
    <div className="tool-item">
      <div className="tool-header">
        <span className="tool-label">REVIEWER ({count})</span>
        <button className="reset-btn" onClick={() => { onAction(ahKey, 0); onAction(`${ahKey}-fs`, {}); }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
      <div className="filler-bank">
        {fillers.map(f => (
          <button key={f} className="f-b" onClick={() => up(f)}>
            {f} <span className="f-v">{fs[f] || 0}</span>
          </button>
        ))}
      </div>
      <input className="tool-input" placeholder="Reviewer notes..." 
             value={state[`${ahKey}-n`] || ''} 
             onChange={e => onAction(`${ahKey}-n`, e.target.value)} />
    </div>
  );
};
