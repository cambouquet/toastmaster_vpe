import React from 'react';
import { SystemClock } from './SystemClock';

export const StatusReadout = ({ isAuth, user, onToggleAuth }) => (
  <div className="status-content">
    <div className={`logo-wrap ${!isAuth ? 'scan' : ''}`} style={{ cursor: 'default' }}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M5 15h90v15H60v55H40V30H5V15z" />
        <path d="M10 20l80 0v5l-80 0z" opacity="0.3" fill="#000" />
      </svg>
    </div>
    <span className="app-name">TOASTMASTER</span>
    <span className="sep px-2">//</span>
    {!isAuth ? (
      <button className="status-meta-group clickable" onClick={onToggleAuth}>
        <span className="lbl">STATUS:</span><span className="val err">DISCONNECTED</span>
        <span className="sep">|</span>
        <span className="val dim sm scan">SYNC IN...</span>
      </button>
    ) : (
      <div className="status-meta-group" style={{ whiteSpace: 'nowrap' }}>
        <span className="lbl">ID:</span>
        <span className="val hi">{user.name}</span>
        <span className="sep">·</span>
        <span className="val sm dim">{user.role}</span>
        <span className="sep">|</span>
        <span className="val ok sm">ONLINE</span>
        <span className="sep">|</span>
        <SystemClock />
        <span className="sep">|</span>
        <span className="val hi sm">TOKYO</span>
      </div>
    )}
  </div>
);
