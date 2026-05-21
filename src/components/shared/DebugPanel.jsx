import React, { useState } from "react";
export const DebugPanel = ({ logs, state, onClose, onClear, onHealth }) => {
  const [copied, setC] = useState(false);
  const [pos, setP] = useState({ x: window.innerWidth - 350, y: 150 });
  const [isD, setD] = useState(false);
  const copy = (t) => {
    navigator.clipboard.writeText(t); setC(true); setTimeout(() => setC(false), 800);
  };
  return (
    <div className="debug-panel" onMouseMove={(e) => isD && setP({ x: e.clientX - 160, y: e.clientY - 20 })} 
         onMouseUp={() => setD(false)} style={{ left: pos.x, top: pos.y }}>
      <div className="debug-header" onMouseDown={() => setD(true)} style={{ cursor: "move" }}>
        <span className="title">CORE KERNEL</span>
        <div className="header-actions">
          <button className="clear-btn" onClick={onClear}>CLEAR</button>
          <button className="clear-btn" onClick={() => copy(logs.map(l => `[${l.time}] ${l.msg}`).join("\n"))}>
            {copied ? "SYNCED" : "DUMP"}
          </button>
          <button className="clear-btn" onClick={() => {
            const r = onHealth();
            copy(`STATUS: ${r.status} | NODE: ${r.state.screen} | NODES: ${r.state.members}`);
          }}>{copied ? "COPIED" : "DIAG"}</button>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="debug-content scroll-hidden">
        <label>SYSTEM LOGS</label>
        <div className="scroll-hidden" style={{ flex: 1, overflowY: "auto" }}>
          {logs.map((l) => (
            <div key={l.id} className={`log-entry ${l.type}`} onClick={() => copy(`[${l.time}] ${l.msg}`)}>
              <span className="time">{l.time.split(" ")[0]}</span>
              <span className="msg">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
