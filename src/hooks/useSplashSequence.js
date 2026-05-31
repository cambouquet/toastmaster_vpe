import { useState, useEffect } from 'react';
import { useRoleCycling } from './useRoleCycling';

export const useSplashSequence = (onFinish) => {
  const [phase, setPhase] = useState('booting');
  const [colors, setColors] = useState({});
  const displayRole = useRoleCycling(phase);

  useEffect(() => {
    const cyan = '#00bac4';
    const gold = '#fcee0a';
    const red = '#ff003c';
    const white = '#ffffff';
    
    // Explicit 4 colors: white, gold, cyan, red
    const palette = [white, gold, cyan, red];
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    setColors({
      logoPrimary: white,
      logoGlow: cyan,
      border: cyan,
      line1: white,
      line2: white,
      line3: white,
      highlightBg: pick(),
      palette
    });
    
    const sequence = [
      { p: 'logo', d: 200 },
      { p: 'motto', d: 500 },
      { p: 'cycling', d: 1000 }, // Start identity cycle at 1s
      { p: 'exiting', d: 4800 },
      { p: 'complete', d: 6000 } 
    ];
    
    const timers = sequence.map(({ p, d }) => 
      setTimeout(() => p === 'complete' ? onFinish() : setPhase(p), d)
    );

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return { phase, displayRole, colors };
};