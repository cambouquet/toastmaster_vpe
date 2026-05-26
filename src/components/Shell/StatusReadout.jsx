import React from 'react';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';
import { getAppInfo } from '../../services/system/AppRegistry';

const StatusGuest = ({ onAuth }) => (
  <button className="guest-sync-btn neural-wave" onClick={(e) => { e.stopPropagation(); onAuth(); }}>
    <span className="val sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const appInfo = getAppInfo(currentApp);
  const AppIcon = appInfo?.Icon;

  return (
    <div className="status-content">
      {!isAuth ? (
        <>
          <div className="t-group group-1">
            <div className="status-item-persistent" style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
            </div>
            <span className="sep px-2">//</span>
            <SystemClock />
            <span className="sep px-1">//</span>
            <span className="val sm location-text">NIGHT CITY</span>
            <span className="sep px-1">//</span>
            <WeatherTelemetry />
          </div>
          <div className="desktop-spacer" style={{ flex: 1 }} />
          <div className="t-group group-2 action-group">
            <StatusGuest onAuth={onToggleAuth} />
          </div>
        </>
      ) : (
        <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} hovered={hovered} AppIcon={AppIcon} />
      )}
    </div>
  );
};
