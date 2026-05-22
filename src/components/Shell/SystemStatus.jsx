import React from 'react';
export const SystemStatus = ({ user, screen, nodeCount, onAuth }) => {
  const isAuth = user.role !== 'NONE' && user.name !== 'Guest';
  return (
    <div className="system-status-readout">
      ID: {user.name} ({user.role}) &nbsp;|&nbsp; STATUS: OPERATIONAL &nbsp;|&nbsp; NODE: {screen.toUpperCase()} &nbsp;|&nbsp; NODES: {nodeCount}
      <button className={`auth-btn icn ${isAuth ? 'active' : ''}`} onClick={onAuth}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <line x1="12" y1="2" x2="12" y2="12" />
        </svg>
      </button>
    </div>
  );
};
