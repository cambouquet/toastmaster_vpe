import React from 'react';
export const SystemStatus = ({ user, screen, nodeCount, onAuth }) => (
  <div className="system-status-readout">
    ID: {user.name} ({user.role}) &nbsp;|&nbsp; STATUS: OPERATIONAL &nbsp;|&nbsp; NODE: {screen.toUpperCase()} &nbsp;|&nbsp; NODES: {nodeCount}
    <button className="auth-btn" onClick={onAuth}>
      {user.role === 'NONE' || user.name === 'Guest' ? 'AUTH_UPLINK' : 'DISCONNECT'}
    </button>
  </div>
);
