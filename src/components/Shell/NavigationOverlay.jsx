import React from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import { NavGridItem } from './NavGridItem';
import './NavigationOverlay.scss';

export const NavigationOverlay = ({ onClose, currentApp, onSwitch }) => (
  <div className="nav-overlay" onClick={onClose}>
    <div className="nav-grid-bg" />
    <div className="nav-content" onClick={e => e.stopPropagation()}>
      <div className="nav-header">
        <Logo style={{ width: 24, height: 24, marginRight: 8 }} />
        <span className="lbl">SYSTEM BRIDGE</span>
        <span className="sep px-2">//</span>
        <span className="val hi">GLOBAL CLUSTER</span>
      </div>
      <div className="grid-container">
        <NavGridItem 
          id="mc" label="MISSION CONTROL" active={currentApp === 'mission-control'}
          status={currentApp === 'mission-control' ? 'CURRENT NODE' : 'ONLINE'}
          onClick={() => { onSwitch('mission-control'); onClose(); }}
        >
          <Logo style={{ width: 48, height: 48, marginBottom: 10 }} />
        </NavGridItem>
        <NavGridItem 
          id="tm" label="TOASTMASTER" active={currentApp === 'toastmaster'}
          status={currentApp === 'toastmaster' ? 'CURRENT NODE' : 'ONLINE'}
          onClick={() => { onSwitch('toastmaster'); onClose(); }}
        >
          <ToastmasterLogo style={{ width: 48, height: 48, marginBottom: 10 }} />
        </NavGridItem>
        <NavGridItem id="n3" label="NODE 0003" status="OFFLINE" locked>
          <div className="icn">??</div>
        </NavGridItem>
        {[...Array(9)].map((_, i) => (
          <NavGridItem key={i} label="PENDING..." status="---"><div className="icn">..</div></NavGridItem>
        ))}
      </div>
      <div className="nav-footer">2 / 1000 NODES INITIALIZED</div>
    </div>
  </div>
);
