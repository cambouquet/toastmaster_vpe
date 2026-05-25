import React from 'react';
import { NavGridItem } from './NavGridItem';
import { APPS } from '../../services/system/AppRegistry';
import './NavigationOverlay.scss';

const AVAILABLE_APPS = ['identity-lab', 'toastmaster', 'font-lab'];

export const NavigationOverlay = ({ onClose, currentApp, onSwitch }) => (
  <div className="nav-overlay" onClick={onClose}>
    <div className="nav-grid-bg" />
    <div className="nav-content" onClick={e => e.stopPropagation()}>
      <div className="nav-header">
        <span className="val hi">APP SWITCHER</span>
      </div>
      <div className="grid-container">
        {AVAILABLE_APPS.map(appId => {
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
              <Icon style={{ width: 48, height: 48, marginBottom: 10 }} />
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
      <div className="nav-footer">{AVAILABLE_APPS.length} / 1000 APPS INITIALIZED</div>
    </div>
  </div>
);
