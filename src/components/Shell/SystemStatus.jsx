import React, { useState } from 'react';
import { StatusReadout } from './StatusReadout';
import { SystemPower } from './SystemPower';
import { Logo } from './Logo';
import './SystemStatus.scss';

export const SystemStatus = ({ user, currentApp, nodeCount, onAuth, onToggleNav }) => {
  const isAuth = user.role !== 'NONE' && user.name !== 'AUTHORIZATION REQUIRED';
  const [showRoles, setShowRoles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [search, setSearch] = useState('');
  
  const handleAuth = () => { setShowRoles(!showRoles); setSearch(''); };
  const handlePowerBtn = () => isAuth && onAuth('logout');
  const handleIdentity = (id, data) => { setShowRoles(false); onAuth(id, data); };

  return (
    <div 
      className={`system-status-readout ${showRoles ? 'is-connected' : ''} ${isAuth ? 'is-auth' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="system-status-bg" />
      <div className="status-display-area">
        <StatusReadout 
          isAuth={isAuth} 
          user={user} 
          currentApp={currentApp}
          hovered={isHovered || showRoles}
          onToggleAuth={handleAuth} 
          onToggleNav={onToggleNav} 
        />
      </div>
      <button className="system-trigger terminal-glitch neural-wave" 
        onClick={onToggleNav} style={{ '--wave-idx': 1 }}>
        <div className="scanline" />
        <Logo scan={true} style={{ width: 16, height: 16 }} />
      </button>
      <SystemPower 
        isAuth={isAuth} showRoles={showRoles} onPower={handlePowerBtn}
        onIdentity={handleIdentity} onClose={() => setShowRoles(false)}
        search={search} setSearch={setSearch} />
    </div>
  );
};
