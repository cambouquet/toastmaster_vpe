import React from 'react';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';
import { getAppInfo } from '../../services/system/AppRegistry';

const StatusGuest = ({ onAuth }) => (
  <div className="status-guest-link pulse-cyan" onClick={(e) => { e.stopPropagation(); onAuth(); }}>
    <span className="val sm">SYNC IN...</span>
  </div>
);

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const appInfo = getAppInfo(currentApp);
  const AppIcon = appInfo?.Icon;

  return (
    <div className="status-content">
      <div className="desktop-spacer" style={{ flex: 1 }} />
      {!isAuth ? (
        <div className="t-group group-all-right">
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
          <div className="desktop-spacer" style={{ width: 40 }} />
          <div className="t-group group-2 action-group">
            <StatusGuest onAuth={onToggleAuth} />
          </div>
        </div>
      ) : (
        <div className="t-group group-all-right">
          <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} hovered={hovered} AppIcon={AppIcon} />
        </div>
      )}
    </div>
  );
};
