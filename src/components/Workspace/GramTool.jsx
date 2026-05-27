import React from 'react';
import './GramTool.scss';

export const GramTool = ({ activeIdx, state, onAction }) => (
  <div className="tool-item full-w">
    <div className="tool-header"><span className="tool-label">NOTES / WOTD</span></div>
    <div className="gram-tools">
      <input className="tool-input" placeholder="Notes..." 
             value={state[`gram-${activeIdx}-g`] || ''} onChange={e => onAction(`gram-${activeIdx}-g`, e.target.value)} />
      <input className="tool-input" placeholder="Feedback..." 
             value={state[`gram-${activeIdx}-i`] || ''} onChange={e => onAction(`gram-${activeIdx}-i`, e.target.value)} />
      <div className="wotd-tracker">
        <span className="tool-label">WOTD</span>
        <div className="counter-controls">
          <button onClick={() => onAction(`wotd-${activeIdx}`, Math.max(0, (state[`wotd-${activeIdx}`] || 0) - 1))}>-</button>
          <span className="count-val-sm">{state[`wotd-${activeIdx}`] || 0}</span>
          <button onClick={() => onAction(`wotd-${activeIdx}`, (state[`wotd-${activeIdx}`] || 0) + 1)}>+</button>
        </div>
      </div>
    </div>
  </div>
);
