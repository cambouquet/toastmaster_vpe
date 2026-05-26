import React from 'react';
import { NavGridItem } from './NavGridItem';
import { APPS } from '../../services/system/AppRegistry.jsx';
import './AppLauncher.scss';

const DEFAULT_ORDER = ['toastmaster', 'identity-lab', 'font-lab', 'mission-control'];

export const AppLauncher = ({ onSwitch }) => {
  return (
    <div className="app-launcher">
      <div className="launcher-header">
        <div className="status-line">SYSTEM STATUS: <span className="val hi">OPTIMIZED</span></div>
        <div className="glitch-title" data-text="ESTABLISH SYNC">ESTABLISH SYNC</div>
        <div className="subtitle">AVAILABLE NEURAL INTERFACES</div>
      </div>

      <div className="launcher-grid">
        {DEFAULT_ORDER.map(appId => {
          const app = APPS[appId];
          const Icon = app.Icon;
          return (
            <NavGridItem 
              key={appId}
              id={appId} 
              label={app.name} 
              active={false}
              status="STANDBY"
              onClick={() => onSwitch(appId)}
            >
              <div className="app-icon-container">
                <Icon style={{ width: '100%', height: '100%' }} />
              </div>
            </NavGridItem>
          );
        })}
      </div>

      <div className="launcher-footer">
        <div className="terminal-log">
          > INITIALIZING HUB... DONE<br/>
          > WAITING FOR USER SELECTION...
        </div>
      </div>
    </div>
  );
};
