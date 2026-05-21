import { useState, useEffect, useCallback } from 'react';

export const useSystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const clearLogs = useCallback(() => setLogs([]), []);

  const addLog = useCallback((msg, type = 'info') => {
    const text = typeof msg === 'object' ? JSON.stringify(msg) : String(msg);
    setLogs(prev => [{ 
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(), 
      msg: text, 
      type 
    }, ...prev].slice(0, 25));
  }, []);

  return { logs, addLog, clearLogs };
};
