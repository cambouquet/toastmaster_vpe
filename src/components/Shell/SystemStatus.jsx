import React, { useState } from 'react';
import { StatusReadout } from './StatusReadout';
import { SystemPower } from './SystemPower';
import './SystemStatus.scss';

export const SystemStatus = ({ user, screen, nodeCount, onAuth }) => {
  const isAuth = user.role !== 'NONE' && user.name !== 'AUTHORIZATION_REQUIRED';
  const [showRoles, setShowRoles] = useState(false);
  const [search, setSearch] = useState('');
  
  const handleAuth = () => { setShowRoles(!showRoles); setSearch(''); };
  const handlePowerBtn = () => isAuth && onAuth('logout');
  const handleIdentity = (id, data) => { setShowRoles(false); onAuth(id, data); };

  return (
    <div className={`system-status-readout ${showRoles ? 'is-connected' : ''} ${isAuth ? 'is-auth' : ''}`}>
      <div className="system-status-bg" />
      <div className="status-display-area">
        <StatusReadout isAuth={isAuth} user={user} onToggleAuth={handleAuth} />
      </div>
      <SystemPower 
        isAuth={isAuth} showRoles={showRoles} onPower={handlePowerBtn}
        onIdentity={handleIdentity} onClose={() => setShowRoles(false)}
        search={search} setSearch={setSearch} />
    </div>
  );
};
