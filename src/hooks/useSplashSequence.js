import { useState, useEffect } from 'react';
import { useRoleCycling } from './useRoleCycling';

export const useSplashSequence = (onFinish) => {
  const [phase, setPhase] = useState('booting');
  const [colors, setColors] = useState({});
  const displayRole = useRoleCycling(phase);

  useEffect(() => {
    const palette = ['#00bac4', '#ff003c', '#fcee0a'];
    // Shuffle and pick 2
    const chosen = palette.sort(() => 0.5 - Math.random()).slice(0, 2);
    chosen.push('#ffffff'); // Always include white
    
    const pick = () => chosen[Math.floor(Math.random() * chosen.length)];

    setColors({
      logoPrimary: pick(),
      logoGlow: pick(),
      border: pick(),
      line1: pick(),
      line2: pick(),
      line3: pick(),
      highlightBg: pick(),
      palette: chosen
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