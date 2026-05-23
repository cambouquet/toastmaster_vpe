import React, { useState } from 'react';
import { IdentityDropdown } from './IdentityDropdown';
import { StatusReadout } from './StatusReadout';
import './SystemStatus.scss';

export const SystemStatus = ({ user, screen, nodeCount, onAuth }) => {
  const isAuth = user.role !== 'NONE' && user.name !== 'AUTHORIZATION_REQUIRED';
  const [showRoles, setShowRoles] = useState(false);
  const [search, setSearch] = useState('');
  
  const handleAuth = () => {
    setShowRoles(!showRoles);
    setSearch('');
  };

  const handlePowerBtn = () => {
    if (isAuth) onAuth('logout');
  };

  const handleIdentity = (id, data) => {
    setShowRoles(false);
    onAuth(id, data);
  };

  return (
    <div className={`system-status-readout ${showRoles ? 'is-connected' : ''} ${isAuth ? 'is-auth' : ''}`}>
      <div className="system-status-bg" />
      <div className="status-display-area">
        <StatusReadout isAuth={isAuth} user={user} onToggleAuth={handleAuth} />
      </div>

      <div className="auth-wrap">
        <button className={`auth-btn icn ${isAuth ? 'active' : ''}`} onClick={handlePowerBtn}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" />
          </svg>
        </button>
        {showRoles && !isAuth && <IdentityDropdown onAuth={handleIdentity} 
          onClose={() => setShowRoles(false)} search={search} setSearch={setSearch} />} 
      </div>
    </div>
  );
};
