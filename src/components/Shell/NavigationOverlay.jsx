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
        <span className="val hi">APP SWITCHER</span>
      </div>
      <div className="grid-container">
        <NavGridItem 
          id="id-lab" label="IDENTITY LAB" active={currentApp === 'identity-lab'}
          status={currentApp === 'identity-lab' ? 'CURRENT APP' : 'ONLINE'}
          beta={true}
          onClick={() => { onSwitch('identity-lab'); onClose(); }}
        >
          <Logo style={{ width: 48, height: 48, marginBottom: 10 }} />
        </NavGridItem>
        <NavGridItem 
          id="tm" label="TOASTMASTER" active={currentApp === 'toastmaster'}
          status={currentApp === 'toastmaster' ? 'CURRENT APP' : 'ONLINE'}
          beta={true}
          onClick={() => { onSwitch('toastmaster'); onClose(); }}
        >
          <ToastmasterLogo style={{ width: 48, height: 48, marginBottom: 10 }} />
        </NavGridItem>
        <NavGridItem id="n3" label="APP 0003" status="OFFLINE" locked>
          <div className="icn">??</div>
        </NavGridItem>
        {[...Array(9)].map((_, i) => (
          <NavGridItem key={i} label="PENDING..." status="---"><div className="icn">..</div></NavGridItem>
        ))}
      </div>
      <div className="nav-footer">2 / 1000 APPS INITIALIZED</div>
    </div>
  </div>
);
