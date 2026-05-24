import { useState } from 'react';

export const useAuthSync = (uiAction) => {
  const [syncProgress, setSyncProgress] = useState(0);

  const onAuth = (role, extra) => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        clearInterval(interval);
        setSyncProgress(0);
        if (role === 'logout') return uiAction('logout');
        uiAction('login', role === 'addMember' ? extra.id : role);
      } else {
        setSyncProgress(current);
      }
    }, 120);
  };

  return { syncProgress, onAuth };
};
