import { useState } from 'react';
import { login, logout, isGuestMode } from '../services/auth/KeycloakService';

export const useAuthSync = (uiAction) => {
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncType, setSyncType] = useState('in');

  const onAuth = (role, data) => {
    let current = 0;
    const type = role === 'logout' ? 'out' : 'in';
    setSyncType(type);
    
    // Virtual handshake sequence
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 12; // Speed up
      if (current >= 100) {
        clearInterval(interval);
        if (role === 'logout') {
          setSyncProgress(0);
          logout();
          return uiAction('logout');
        }

        login(role === 'addMember' ? data?.id : data, data);
        
        // If we are in STANDALONE guest mode, don't wait for a redirect that won't happen
        if (isGuestMode()) {
          setSyncProgress(0);
        } else {
          setSyncProgress(100); 
        }
        
        if (role === 'addMember' || role === 'login') {
          uiAction('login', data);
        }
      } else {
        setSyncProgress(Math.min(current, 99));
      }
    }, 70);
  };

  return { syncProgress, syncType, onAuth };
};
