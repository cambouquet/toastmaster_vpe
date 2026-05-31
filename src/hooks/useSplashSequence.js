import { useState, useEffect } from 'react';
import { useRoleCycling } from './useRoleCycling';
import { SPLASH_COLORS, SPLASH_SEQUENCE } from './SplashConfig';

export const useSplashSequence = (onFinish) => {
  const [phase, setPhase] = useState('booting');
  const [colors, setColors] = useState({});
  const displayRole = useRoleCycling(phase);

  useEffect(() => {
    const { white, cyan } = SPLASH_COLORS;
    setColors({
      logoPrimary: white,
      logoGlow: cyan,
      border: cyan,
      line1: white,
      line2: white,
      line3: white,
      highlightBg: cyan,
      palette: Object.values(SPLASH_COLORS)
    });
    
    const timers = SPLASH_SEQUENCE.map(({ p, d }) => 
      setTimeout(() => p === 'complete' ? onFinish() : setPhase(p), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return { phase, displayRole, colors };
};