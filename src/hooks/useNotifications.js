import { useState } from 'react';
export const useNotifications = () => {
  const [notifications, setN] = useState([]);
  const notify = (msg, type = 'info') => {
    const id = Date.now();
    setN(s => [...s, { id, msg, type }]);
  };
  const dismiss = (id) => setN(s => s.filter(n => n.id !== id));
  return { notifications, notify, dismiss };
};
