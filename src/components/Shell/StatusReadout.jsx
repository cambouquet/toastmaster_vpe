import React from 'react';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { StatusGuest } from './StatusGuest';
import { MEMBERS_DATA } from '../../data/members';
import { getAppInfo } from '../../services/system/AppRegistry.jsx';

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth, state, uiAction }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length, appInfo = getAppInfo(currentApp);
  const AppIcon = appInfo?.Icon;
  return (
    <div className="status-content">
      <div className="desktop-spacer" style={{ flex: 1 }} />
      <div className="group-all-right">
        {!isAuth ? (
          <>
            <div className="t-group group-1">
              <div className="status-item-persistent" style={{ width: 'auto', height: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
                <span className="val sm app-name-label" style={{ fontWeight: 800, letter-spacing: '1px', opacity: 0.9 }}>{appInfo?.name?.toUpperCase()}</span>
              </div>
              <span className="sep px-2">//</span><SystemClock /><span className="sep px-1">//</span>
              <span className="val sm location-text">ANTIBES</span><span className="sep px-1">//</span><WeatherTelemetry />
            </div>
            <div className="desktop-spacer" style={{ width: 40 }} />
            <div className="t-group group-2 action-group"><StatusGuest onAuth={onToggleAuth} /></div>
          </>
        ) : (
          <StatusMeta user={user} online={online} total={MEMBERS_DATA.length} hovered={hovered} AppIcon={AppIcon} state={state} uiAction={uiAction} />
        )}
      </div>
    </div>
  );
};
