import { useState, useEffect } from 'react';

export const useToolkitTimer = (activeIdx, onAction, format) => {
  const [time, setTime] = useState(0), [running, setRunning] = useState(false);
  useEffect(() => {
    let i; if (running) i = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(i);
  }, [running]);
  useEffect(() => { setTime(0); setRunning(false); }, [activeIdx]);
  useEffect(() => { if (time > 0) onAction(`time-${activeIdx}`, format(time)); }, [time]);
  return { time, setTime, running, setRunning };
};
