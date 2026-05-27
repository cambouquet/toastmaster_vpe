import { useState, useEffect } from 'react';

export const useRoleCycling = (phase) => {
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];

  useEffect(() => {
    if (phase !== 'cycling') return;
    let roleIdx = 0;
    const roleTimer = setInterval(() => {
      if (roleIdx < roles.length - 1) {
        const next = roles[++roleIdx];
        let its = 0;
        const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
        const scr = setInterval(() => {
          setDisplayRole(next.split("").map((c, i) => i < its ? next[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
          if (its >= next.length) clearInterval(scr);
          its += 0.5;
        }, 30);
      } else clearInterval(roleTimer);
    }, 1200);
    return () => clearInterval(roleTimer);
  }, [phase]);

  return displayRole;
};
