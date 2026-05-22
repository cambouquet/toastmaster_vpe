import React from 'react';
export const StatusReadout = ({ isAuth, user }) => (
  <div className="status-content" key={isAuth ? user.name : 'OFFLINE'}>
    <div className="logo-wrap">
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M5 15h90v15H60v55H40V30H5V15z" /><path d="M10 20l80 0v5l-80 0z" opacity="0.3" fill="#000" />
        <path d="M15 10l5 0v5l-5 0z M80 10l5 0v5l-5 0z" opacity="0.6" />
      </svg>
    </div>
    <span className="app-name">TOASTMASTER</span>
    <span className="sep px-2">//</span>
    {!isAuth ? (
      <div className="status-meta-group">
        <span className="lbl">STATUS:</span><span className="val err">[ DISCONNECTED ]</span>
        <span className="sep">|</span>
        <span className="val dim sm scan">CLICK HERE TO PLUG IN...</span>
      </div>
    ) : (
      <div className="status-meta-group">
        <span className="lbl">USER:</span><span className="val hi">[{user.name}]</span>
        <span className="sep">|</span><span className="lbl">ROLE:</span><span className="val">[{user.role}]</span>
        <span className="sep">|</span><span className="val ok sm">ONLINE</span>
      </div>
    )}
  </div>
);
