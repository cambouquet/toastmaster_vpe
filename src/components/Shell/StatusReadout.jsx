import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="status-meta-group clickable neural-wave" onClick={onAuth} style={{ '--wave-idx': 2 }}>
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
          <div className="neural-wave" style={{ '--wave-idx': 5 }}>
            <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9, marginRight: 8 }} />
          </div>
          <span className="app-name neural-wave" style={{ '--wave-idx': 4 }}>
            {isMC ? 'MISSION CONTROL' : 'TOASTMASTER'}
          </span>
        </div>
        <span className="sep px-2">//</span>
        {!isAuth ? (
          <div className="status-guest-wrap">
            <SystemClock />
            <span className="sep mx-2">|</span>
            <span className="val sm dim">NIGHT CITY // EARTH</span>
            <span className="sep mx-2">|</span>
            <WeatherTelemetry />
            <span className="sep mx-2">|</span>
            <div className="guest-action-cell" style={{ background: 'transparent', padding: '0 12px 0 0' }}>
              <StatusGuest onAuth={onToggleAuth} />
            </div>
          </div>
        ) : <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} />}
      </div>
    </div>
  );
};
