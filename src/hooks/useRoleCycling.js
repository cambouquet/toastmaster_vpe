import { useState, useEffect } from 'react';

export const useRoleCycling = (phase) => {
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const roles = ['WARRIOR', 'WOMAN', 'MAN', 'HUMAN'];

  useEffect(() => {
    if (phase === 'booting') {
      setDisplayRole('WARRIOR');
      return;
    }
    if (phase !== 'cycling' && phase !== 'exiting') return;
    
    // If we've already reached HUMAN, don't restart the cycle
    if (displayRole === 'HUMAN') return;

    let roleIdx = 0;

    const roleTimer = setInterval(() => {
      roleIdx++;
      
      if (roleIdx < roles.length) {
        scrambleTo(roles[roleIdx]);
      }

      if (roleIdx === roles.length - 1) {
        clearInterval(roleTimer);
      }
    }, 1000); 

    function scrambleTo(word) {
      let its = 0;
      const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
      const scr = setInterval(() => {
        setDisplayRole(word.split("").map((c, i) => i < its ? word[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (its >= word.length) clearInterval(scr);
        its += 1;
      }, 20);
    }

    return () => clearInterval(roleTimer);
  }, [phase]);

  return displayRole;
};
