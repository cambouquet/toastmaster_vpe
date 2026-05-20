import React from 'react';

export const DebugPanel = ({ logs, state, onClose }) => (
  <div className="debug-panel">
    <div className="glitch-scanline" />
    <div className="debug-header">
      <div className="header-orb" />
      <span className="title">CORE_KERNEL_V2.0.77</span>
      <button className="close-btn" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="16"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg>
      </button>
    </div>
    <div className="debug-content">
      <div className="debug-key">
        <span className="key-item info">● INF</span>
        <span className="key-item warn">▲ WRN</span>
        <span className="key-item error">✖ ERR</span>
        <span className="key-item debug">○ DBG</span>
      </div>
      <div className="status-grid">
        <div className="status-cell">
          <label>NODE_ENV</label>
          <div className="val">SECURE</div>
        </div>
        <div className="status-cell">
          <label>LATENCY</label>
          <div className="val">1.2ms</div>
        </div>
      </div>
      <div className="section scroll-hidden">
        <label>SYSTEM_LOG_STREAM</label>
        {logs.map((l, i) => (
          <div key={i} className={`log-entry ${l.type}`}>
            <span className="indicator">•</span>
            <span className="time">{l.time.split(' ')[0]}</span>
            <span className="msg">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
