import React, { useState } from 'react';

export const DebugPanel = ({ logs, state, onClose, onClear, onHealth }) => {
  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 350, y: window.innerHeight - 400 });
  const [isD, setIsD] = useState(false);

  const copy = (t) => {
    navigator.clipboard.writeText(t); setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  const onMM = (e) => {
    if (!isD) return;
    setPos({ x: e.clientX - 160, y: e.clientY - 20 });
  };

  return (
    <div className="debug-panel" onMouseMove={onMM} onMouseUp={() => setIsD(false)}
         style={{ left: pos.x, top: pos.y, bottom: 'auto', right: 'auto' }}>
      <div className="debug-header" onMouseDown={() => setIsD(true)} style={{ cursor: 'move' }}>
        <span className="title">CORE KERNEL</span>
        <div className="header-actions">
          <button className="clear-btn" onClick={() => copy(logs.map(l => `[${l.time}] ${l.msg}`).join('\n'))}>
            {copied ? 'SYNCHRONIZED' : 'DUMP LOGS'}
          </button>
          <button className="clear-btn" onClick={onHealth}>HLTH</button>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="debug-content">
        <label>SYSTEM LOGS</label>
        <div className="section scroll-hidden">
          {logs.map((l, i) => (
            <div key={i} className={`log-entry ${l.type}`} onClick={() => copy(`[${l.time}] ${l.msg}`)}>
              <span className="time">{l.time.split(' ')[0]}</span>
              <span className="msg">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};