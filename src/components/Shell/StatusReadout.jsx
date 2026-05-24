import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="t-group clickable neural-wave" onClick={onAuth} style={{ '--wave-idx': 2 }}>
    <span className="val sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const isMC = currentApp === 'mission-control', AppIcon = isMC ? Logo : ToastmasterLogo;
  return (
    <div className="status-content">
      <div className="app-breadcrumb">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9, marginRight: 8 }} />
        </div>
        <span className="app-name neural-wave" style={{ '--wave-idx': 4 }}>
          {isMC ? 'MISSION CONTROL' : 'TOASTMASTER'}
        </span>
      </div>

      {!isAuth ? (
        <>
          <span className="sep px-2">//</span>
          <div className="t-group">
            <SystemClock />
            <span className="sep px-1">//</span>
            <span className="val sm dim">NIGHT CITY // EARTH</span>
            <span className="sep px-1">//</span>
            <WeatherTelemetry />
          </div>
          <span className="sep px-2">//</span>
          <StatusGuest onAuth={onToggleAuth} />
        </>
      ) : (
        <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} />
      )}
    </div>
  );
};
