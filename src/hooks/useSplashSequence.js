import { useState, useEffect } from 'react';

export const useSplashSequence = (onFinish) => {
  const [role, setRole] = useState('WARRIOR');
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const [phase, setPhase] = useState('booting');

  useEffect(() => {
    const sequence = [
      { p: 'logo', d: 800 }, { p: 'motto', d: 1800 },
      { p: 'cycling', d: 3000 }, { p: 'footer', d: 6500 },
      { p: 'exiting', d: 8000 }, { p: 'complete', d: 9000 }
    ];
    sequence.forEach(({ p, d }) => {
      setTimeout(() => p === 'complete' ? onFinish() : setPhase(p), d);
    });

    const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];
    let roleIdx = 0;
    const roleTimer = setInterval(() => {
      if (roleIdx < roles.length - 1) {
        const next = roles[++roleIdx];
        setRole(next);
        let its = 0;
        const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
        const scr = setInterval(() => {
          setDisplayRole(next.split("").map((c, i) => i < its ? next[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
          if (its >= next.length) clearInterval(scr);
          its += 1/3;
        }, 30);
      } else clearInterval(roleTimer);
    }, 1500);
    return () => clearInterval(roleTimer);
  }, [onFinish]);

  return { phase, displayRole };
};