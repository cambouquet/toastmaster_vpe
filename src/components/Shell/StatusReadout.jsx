import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { StatusMeta } from './StatusMeta';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="status-meta-group clickable" onClick={onAuth}>
    <span className="lbl">UPLINK:</span><span className="val err scan">NEURAL SYNC REQ...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const isMC = currentApp === 'mission-control', AppIcon = isMC ? Logo : ToastmasterLogo;
  
  return (
    <div className="status-content">
      <div className="status-main-info">
        <div className="app-breadcrumb">
          <AppIcon style={{ width: 14, height: 14, opacity: 0.9, marginRight: 8 }} />
          <span className="app-name">{isMC ? 'MISSION CONTROL' : 'TOASTMASTER'}</span>
        </div>
        <span className="sep px-2">//</span>
        {!isAuth ? <StatusGuest onAuth={onToggleAuth} /> : (
          <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} />
        )}
      </div>
      <button className="system-trigger terminal-glitch" onClick={onToggleNav}>
        <div className="scanline" />
        <Logo scan={!isAuth} style={{ width: 16, height: 16 }} />
      </button>
    </div>
  );
};
