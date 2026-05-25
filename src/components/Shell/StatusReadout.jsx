import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { TypeFoundryLogo } from './TypeFoundryLogo';
import { KFontText } from './KFontText';
import { StatusMeta } from './StatusMeta';
import { SystemClock } from './SystemClock';
import { WeatherTelemetry } from './WeatherTelemetry';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="t-group clickable neural-wave" onClick={onAuth} style={{ '--wave-idx': 2 }}>
    <span className="val sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, hovered, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  
  const getAppIcon = () => {
    if (currentApp === 'font-lab') return TypeFoundryLogo;
    if (currentApp === 'mission-control' || currentApp === 'identity-lab') return Logo;
    return ToastmasterLogo;
  };

  const AppIcon = getAppIcon();

  const getAppName = () => {
    if (currentApp === 'font-lab') return 'FONT LAB';
    if (currentApp === 'identity-lab') return 'IDENTITY LAB';
    return 'TOASTMASTER';
  };

  const getAppColor = () => {
    if (currentApp === 'font-lab' || currentApp === 'identity-lab') return '#ff0044';
    return '#00bac4';
  };

  const GuestChain = () => (
    <>
      <div className="t-group">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />
        </div>
        <span className="sep px-1">//</span>
        <div style={{ marginRight: 6 }}>
          <KFontText 
            text={getAppName()} 
            height={8} 
            color={currentApp === 'toastmaster' ? '#00bac4' : '#ffffff'} 
            firstLetterColor={currentApp === 'toastmaster' ? '#00bac4' : '#ff0044'}
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
          AppIcon={AppIcon}
        />
      )}
    </div>
  );
};
