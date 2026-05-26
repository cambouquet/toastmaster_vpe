import { useState } from 'react';
import { login, logout } from '../services/auth/KeycloakService';

export const useAuthSync = (uiAction) => {
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncType, setSyncType] = useState('in');

  const onAuth = (role, extra) => {
    let current = 0;
    const type = role === 'logout' ? 'out' : 'in';
    setSyncType(type);
    
    // Virtual sync animation before real Keycloak redirect
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 10;
      if (current >= 100) {
        clearInterval(interval);
        setSyncProgress(0);
        if (role === 'logout') {
          logout();
          return uiAction('logout');
        }
        // Redirect to real Keycloak login
        login();
      } else {
        setSyncProgress(current);
      }
    }, 150);
  };

  return { syncProgress, syncType, onAuth };
};
