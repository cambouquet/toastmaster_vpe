import React from 'react';

export const DebugPanel = ({ logs, state, onClose }) => (
  <div className="debug-panel">
    <div className="debug-header">
      <span>SYSTEM_LOG</span>
      <button onClick={onClose}>×</button>
    </div>
    <div className="debug-content">
      <div className="section">
        <label>STATE_DUMP</label>
        <pre>{JSON.stringify({ screen: state.currentScreen, memberCount: state.members.length, theme: state.theme }, null, 2)}</pre>
      </div>
      <div className="section">
        <label>LOG_EVENT_STREAM</label>
        {logs.map((l, i) => (
          <div key={i} className={`log-entry ${l.type}`}>
            <span className="time">[{l.time}]</span> {l.msg}
          </div>
        ))}
      </div>
    </div>
  </div>
);
