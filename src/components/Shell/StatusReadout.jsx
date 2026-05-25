import React from 'react';
import { KFontText } from './KFontText';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';
import { getAppInfo } from '../../services/system/AppRegistry';

const StatusGuest = ({ onAuth }) => (
  <button className="t-group clickable neural-wave" onClick={onAuth} style={{ '--wave-idx': 2 }}>
    <span className="val sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const appInfo = getAppInfo(currentApp);
  const AppIcon = appInfo.Icon;

  const GuestChain = () => (
    <>
      <div className="t-group">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />
        </div>
        <span className="sep px-1">//</span>
        <div style={{ marginRight: 6 }}>
          <KFontText 
            text={appInfo.name} 
            height={8} 
            color={currentApp === 'toastmaster' ? appInfo.themeColor : '#ffffff'} 
            firstLetterColor={appInfo.themeColor}
          />
        </div>
        <SystemClock />
      </div>

      {hovered && (
        <>
          <span className="sep px-2">//</span>
          <div className="t-group">
            <span className="val sm dim">NIGHT CITY</span>
            <span className="sep px-1">//</span>
            <WeatherTelemetry />
          </div>
          <span className="sep px-2">//</span>
          <StatusGuest onAuth={onToggleAuth} />
        </>
      )}

      {!hovered && (
        <>
          <span className="sep px-1">//</span>
          <WeatherTelemetry />
        </>
      )}
    </>
  );

  return (
    <div className="status-content">
      {!isAuth ? (
        <GuestChain />
      ) : (
        <StatusMeta 
          user={user} 
          online={online} 
          total={MEMBERS_DATA.length} 
          hovered={hovered} 
          AppIcon={appInfo.Icon}
        />
      )}
    </div>
  );
};
