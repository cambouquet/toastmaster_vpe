import { useState, useEffect, useCallback } from 'react';

export const useSystemLogs = () => {
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((msg, type = 'info') => {
    const text = typeof msg === 'object' ? JSON.stringify(msg) : String(msg);
    setLogs(prev => [...prev, { 
      time: new Date().toLocaleTimeString(), 
      msg: text, 
      type 
    }].slice(-25));
  }, []);

  useEffect(() => {
    const originals = { log: console.log, error: console.error, warn: console.warn, info: console.info };
    console.log = (...args) => { originals.log(...args); addLog(args[0], 'info'); };
    console.info = (...args) => { originals.info(...args); addLog(args[0], 'info'); };
    console.error = (...args) => { originals.error(...args); addLog(args[0], 'error'); };
    console.warn = (...args) => { originals.warn(...args); addLog(args[0], 'warn'); };
    return () => Object.assign(console, originals);
  }, [addLog]);

  return { logs, addLog };
};
