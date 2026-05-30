import React from 'react';
import { IdentityDropdown } from './IdentityDropdown';

export const SystemPower = ({ isAuth, onPower }) => (
  <div className="auth-wrap">
    <button className={`auth-btn icn uplink-wave ${isAuth ? 'active' : ''}`} 
      onClick={onPower} style={{ '--wave-idx': 0 }}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" />
      </svg>
    </button>
  </div>
);
