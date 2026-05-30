import React, { useState } from 'react';
import { StatusReadout } from './StatusReadout';
import { SystemPower } from './SystemPower';
import { useStatusRotation } from '../../hooks/useStatusRotation';
import './SystemStatus.scss';

export const SystemStatus = ({ user, currentApp, nodeCount, onAuth, onToggleNav, notifications = [], state, uiAction }) => {
  const isAuth = !!user && user.role !== 'NONE';
  const [showRoles, setShowRoles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [search, setSearch] = useState('');
  const mobileStep = useStatusRotation();
  
  const hasAlerts = notifications?.length > 0;
  const handleAuth = () => {
    if (state.currentUser?.role === 'NONE' || !state.currentUser) {
      onAuth('login');
    } else {
      uiAction('SWITCH_APP', 'identity-lab');
    }
  };
  const handlePowerBtn = () => isAuth && onAuth('logout');
  const handleIdentity = (id, data) => { setShowRoles(false); onAuth(id, data); };
  return (
    <div className={`system-status-readout ${showRoles ? 'is-connected' : 'is-idle'} ${isAuth ? 'is-auth' : ''} step-${mobileStep}`}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="system-status-bg" /><div className="status-display-area">
        <StatusReadout isAuth={isAuth} user={user} currentApp={currentApp} hovered={isHovered || showRoles} 
          onToggleAuth={handleAuth} onToggleNav={onToggleNav} state={state} uiAction={uiAction} />
      </div><button className="system-trigger terminal-glitch uplink-wave" onClick={(e) => { e.stopPropagation(); onToggleNav(); }} style={{ '--wave-idx': 1 }}>
        <div className="scanline" /><div className={`status-dot ${hasAlerts ? 'is-alert' : 'is-idle'}`} />
      </button>
      <SystemPower isAuth={isAuth} showRoles={showRoles} onPower={handlePowerBtn} onIdentity={handleIdentity} onClose={() => setShowRoles(false)} search={search} setSearch={setSearch} />
    </div>);};
