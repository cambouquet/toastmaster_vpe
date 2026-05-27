import { useState, useEffect } from 'react';

export const useRoleCycling = (phase) => {
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];

  useEffect(() => {
    if (phase === 'booting') {
      setDisplayRole('WARRIOR');
      return;
    }
    if (phase !== 'cycling' && phase !== 'exiting') return;
    
    // If we've already reached HUMAN, don't restart the cycle
    if (displayRole === 'HUMAN') return;

    let roleIdx = 0;
    let womanAttempts = 0;

    const roleTimer = setInterval(() => {
      // 1. If currently on WARRIOR, move to WOMAN
      if (roleIdx === 0) {
        roleIdx = 1; // Index of WOMAN
        scrambleTo(roles[1]);
      } 
      // 2. If on WOMAN, try to glitch but stay on WOMAN once
      else if (roleIdx === 1 && womanAttempts < 1) {
        womanAttempts++;
        scrambleTo(roles[1]); // "Fails" and stays on WOMAN
      } 
      // 3. Final attempt: Move to HUMAN
      else if (roleIdx === 1 && womanAttempts === 1) {
        roleIdx = 2; // Index of HUMAN
        scrambleTo(roles[2]);
        clearInterval(roleTimer);
      }
    }, 1000); // 1-second steps to hit the user's timeline precisely

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
