import React from 'react';
import { IdentityDropdown } from './IdentityDropdown';

export const SystemPower = ({ isAuth, showRoles, onPower, onIdentity, onClose, search, setSearch }) => (
  <div className="auth-wrap">
    <button className={`auth-btn icn ${isAuth ? 'active' : ''}`} onClick={onPower}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" />
      </svg>
    </button>
    {showRoles && !isAuth && (
      <IdentityDropdown 
        onAuth={onIdentity} 
        onClose={onClose} 
        search={search} 
        setSearch={setSearch} 
      />
    )} 
  </div>
);
