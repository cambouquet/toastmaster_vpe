import { useState, useEffect } from 'react';
import { useRoleCycling } from './useRoleCycling';

export const useSplashSequence = (onFinish) => {
  const [phase, setPhase] = useState('booting');
  const [colors, setColors] = useState({ group1: '#00bac4', group2: '#fff', group3: '#fcee0a' });
  const displayRole = useRoleCycling(phase);

  useEffect(() => {
    const others = ['#00bac4', '#ff003c', '#fcee0a'];
    const chosen = others.sort(() => 0.5 - Math.random()).slice(0, 2);
    chosen.push('#ffffff');
    const shuffled = chosen.sort(() => 0.5 - Math.random());
    setColors({ group1: shuffled[0], group2: shuffled[1], group3: shuffled[2] });
    
    const sequence = [
      { p: 'logo', d: 300 }, { p: 'motto', d: 800 },
      { p: 'cycling', d: 1500 }, { p: 'exiting', d: 5200 },
      { p: 'complete', d: 6000 }
    ];
    sequence.forEach(({ p, d }) => {
      setTimeout(() => p === 'complete' ? onFinish() : setPhase(p), d);
    });
  }, [onFinish]);

  return { phase, displayRole, colors };
};