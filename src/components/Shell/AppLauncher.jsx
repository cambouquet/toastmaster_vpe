import React from 'react';
import { NavGridItem } from './NavGridItem';
import { APPS } from '../../services/system/AppRegistry.jsx';
import './AppLauncher.scss';

const DEFAULT_ORDER = Object.values(APPS).sort((a, b) => a.char.localeCompare(b.char)).map(a => a.id);

export const AppLauncher = ({ currentApp, onSwitch, user }) => {
  const isAuth = !!user;
  return (
    <div className="app-launcher">
      <div className="launcher-header">
        <div className="status-line">SYSTEM STATUS: <span className="val hi">OPTIMIZED</span></div>
        <div className="glitch-title" data-text="SYSTEM HUB">SYSTEM HUB</div>
        <div className="subtitle">UNLOCK YOUR POTENTIAL</div>
      </div>

      <div className="launcher-grid">
        {DEFAULT_ORDER.map(appId => {
          const app = APPS[appId] || APPS['launcher'];
          const Icon = app.Icon;
          const isActive = currentApp === appId;
          const isLocked = !app.public && !isAuth;
          return (
            <NavGridItem key={appId} id={appId} label={app.name} active={isActive} locked={isLocked}
              status={isLocked ? 'ENCRYPTED' : (isActive ? 'ACTIVE LINK' : 'STANDBY')} 
              onClick={isLocked ? null : () => onSwitch(appId)}>
              <div className="app-icon-container"><Icon style={{ width: '100%', height: '100%' }} /></div>
            </NavGridItem>
          );
        })}
      </div>

      <div className="launcher-footer">
        <div className="terminal-log">
          {">"} INITIALIZING HUB... DONE<br/>
          {">"} WAITING FOR USER SELECTION...
        </div>
      </div>
    </div>
  );
};
