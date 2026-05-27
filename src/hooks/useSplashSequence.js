import { useState, useEffect } from 'react';

export const useSplashSequence = (onFinish) => {
  const [role, setRole] = useState('WARRIOR');
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const [phase, setPhase] = useState('booting');

  useEffect(() => {
    const sequence = [
      { p: 'logo', d: 300 }, { p: 'motto', d: 800 },
      { p: 'cycling', d: 1500 }, { p: 'exiting', d: 5200 },
      { p: 'complete', d: 6000 }
    ];
    sequence.forEach(({ p, d }) => {
      setTimeout(() => p === 'complete' ? onFinish() : setPhase(p), d);
    });

    const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];
    let roleIdx = 0;
    
    // Smooth transitions: 1s for Warrior, 1.2s for Woman, Rest for Human
    const startCycling = setTimeout(() => {
      const roleTimer = setInterval(() => {
        if (roleIdx < roles.length - 1) {
          const next = roles[++roleIdx];
          setRole(next);
          let its = 0;
          const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
          const scr = setInterval(() => {
            setDisplayRole(next.split("").map((c, i) => i < its ? next[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
            if (its >= next.length) clearInterval(scr);
            its += 0.5;
          }, 30);
        } else clearInterval(roleTimer);
      }, 1200); // Equalized spacing for Woman
      return () => clearInterval(roleTimer);
    }, 1500);

    return () => clearTimeout(startCycling);
  }, [onFinish]);

  return { phase, displayRole };
};