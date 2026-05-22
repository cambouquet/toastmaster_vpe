import { useState, useCallback } from 'react';

export const useNotifications = () => {
  const [notifications, setN] = useState([]);
  
  const notify = useCallback((msg, type = 'info') => {
    if (!msg) return;
    setN(s => [...s, { id: Math.random().toString(36).substr(2, 9), msg, type }]);
  }, []);

  const dismiss = useCallback((id) => {
    setN(s => s.filter(n => n.id !== id));
  }, []);

  return { notifications, notify, dismiss };
};
