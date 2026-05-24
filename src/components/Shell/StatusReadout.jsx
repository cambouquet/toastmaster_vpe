import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="status-meta-group clickable" onClick={onAuth}>
    <span className="val sm scan">SYNC IN...</span>
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
        
        {!isAuth ? (
          <div className="status-guest-wrap">
            <SystemClock />
            <span className="sep mx-2">|</span>
            <span className="val sm dim">NIGHT CITY // EARTH</span>
            <div className="guest-action-cell">
              <span className="sep px-2">//</span>
              <StatusGuest onAuth={onToggleAuth} />
            </div>
          </div>
        ) : (
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
