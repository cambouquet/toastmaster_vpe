import { useState, useEffect } from 'react';
import { useRoleCycling } from './useRoleCycling';

export const useSplashSequence = (onFinish) => {
  const [phase, setPhase] = useState('booting');
  const [colors, setColors] = useState({});
  const displayRole = useRoleCycling(phase);

  useEffect(() => {
    const accent = import.meta.env.VITE_WING_COLOR || '#00bac4';
    // Use exactly 3 colors: accent, white (#ffffff), and a dark variant or secondary
    const palette = [accent, '#ffffff', '#0a0c10'];
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    setColors({
      logoPrimary: '#ffffff',
      logoGlow: accent,
      border: accent,
      line1: pick(),
      line2: pick(),
      line3: pick(),
      highlightBg: accent,
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