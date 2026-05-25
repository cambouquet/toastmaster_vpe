import React from 'react';
import { KFontText } from './KFontText';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { MEMBERS_DATA } from '../../data/members';
import { getAppInfo } from '../../services/system/AppRegistry';

const StatusGuest = ({ onAuth }) => (
  <button className="t-group clickable neural-wave" 
    onClick={(e) => { e.stopPropagation(); onAuth(); }} 
    style={{ '--wave-idx': 2 }}>
    <span className="val sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const total = MEMBERS_DATA.length;
  const appInfo = getAppInfo(currentApp);
  const AppIcon = appInfo?.Icon;

  return (
    <div className="status-content">
      {!isAuth ? (
        <>
          <div className="status-item-persistent">
            <div className="neural-wave" style={{ '--wave-idx': 5 }}>
              {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
            </div>
            <span className="sep px-1 mobile-hide">//</span>
            <div style={{ marginRight: 6 }}>
              <KFontText 
                text={appInfo?.name || 'APP'} 
                height={8} 
                color={currentApp === 'toastmaster' ? appInfo?.themeColor : '#ffffff'} 
                firstLetterColor={appInfo?.themeColor}
              />
            </div>
          </div>

          <div className="status-rotation-viewport">
            <div className="t-group group-1">
              <span className="sep px-2 mobile-hide">//</span>
              <SystemClock />
            </div>

            <div className="t-group group-2">
              <span className="sep px-2 mobile-hide">//</span>
              <div className="mobile-hide">
                <span className="val sm dim">NIGHT CITY</span>
                <span className="sep px-1">//</span>
              </div>
              <WeatherTelemetry />
            </div>

            <div className="t-group group-3">
              <span className="sep px-2 mobile-hide">//</span>
              <NetworkSignal online={online} offline={total - online} />
              <span className="sep px-1">//</span>
              <MessagingTelemetry unreadCount={0} />
            </div>
          </div>
        </>
      ) : (
        <StatusMeta 
          user={user} 
          online={online} 
          total={total} 
          hovered={hovered} 
          AppIcon={AppIcon}
        />
      )}
    </div>
  );
};
