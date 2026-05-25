import React from 'react';
import { NavGridItem } from './NavGridItem';
import { APPS } from '../../services/system/AppRegistry';
import './NavigationOverlay.scss';

const DEFAULT_ORDER = ['toastmaster', 'identity-lab', 'font-lab'];

export const NavigationOverlay = ({ onClose, currentApp, onSwitch }) => {
  // Sort apps so current is first
  const sortedApps = [...DEFAULT_ORDER].sort((a, b) => {
    if (a === currentApp) return -1;
    if (b === currentApp) return 1;
    return 0;
  });

  return (
    <div className="nav-overlay" onClick={onClose}>
      <div className="nav-grid-bg" />
      <div className="nav-content" onClick={e => e.stopPropagation()}>
        <div className="nav-header">
          <span className="val hi">APP SWITCHER</span>
        </div>
        <div className="grid-container">
          {sortedApps.map(appId => {
            const app = APPS[appId];
            const Icon = app.Icon;
            return (
              <NavGridItem 
                key={appId}
                id={appId} label={app.name} active={currentApp === appId}
                status={currentApp === appId ? 'CURRENT APP' : 'ONLINE'}
                beta={true}
                onClick={() => { onSwitch(appId); onClose(); }}
              >
                <Icon />
              </NavGridItem>
            );
          })}
          <NavGridItem id="n3" label="APP 0003" status="OFFLINE" locked>
            <div className="icn">??</div>
          </NavGridItem>
          {[...Array(9)].map((_, i) => (
            <NavGridItem key={i} label="PENDING..." status="---"><div className="icn">..</div></NavGridItem>
          ))}
        </div>
        <div className="nav-footer">{sortedApps.length} / 1000 APPS INITIALIZED</div>
      </div>
    </div>
  );
};
