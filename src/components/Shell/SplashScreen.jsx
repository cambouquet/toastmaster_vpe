import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const [role, setRole] = useState('WARRIOR');
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const [phase, setPhase] = useState('booting'); // booting -> logo -> motto -> cycling -> footer -> exiting

  useEffect(() => {
    const sequence = [
      { p: 'logo', d: 800 },
      { p: 'motto', d: 1600 },
      { p: 'cycling', d: 2400 },
      { p: 'footer', d: 4200 },
      { p: 'exiting', d: 5200 },
      { p: 'complete', d: 6000 }
    ];

    sequence.forEach(({ p, d }) => {
      setTimeout(() => {
        if (p === 'complete') onFinish();
        else setPhase(p);
      }, d);
    });

    const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];
    let roleIdx = 0;

    const roleTimer = setInterval(() => {
      if (roleIdx < roles.length - 1) {
        roleIdx++;
        const nextRole = roles[roleIdx];
        setRole(nextRole);
        
        // Scramble effect
        let iterations = 0;
        const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
        const scrambleInterval = setInterval(() => {
          setDisplayRole(
            nextRole.split("")
              .map((char, index) => {
                if (index < iterations) return nextRole[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );
          if (iterations >= nextRole.length) clearInterval(scrambleInterval);
          iterations += 1/3;
        }, 30);
      } else {
        clearInterval(roleTimer);
      }
    }, 1000);

    return () => {
      clearInterval(roleTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen phase-${phase}`}>
      <div className="scanner-line" />
      <div className="vignette" />
      
      <div className="splash-content">
        <div className="logo-glitch-container">
          <Logo />
        </div>

        <div className="motto-container">
          <div className="line-1">THE LIFE GAME</div>
          <div className="line-2">
            BECOME THE <span className="highlight">{displayRole}</span>
          </div>
          <div className="line-3">YOU'RE MEANT TO BE</div>
        </div>

        <div className="system-footer">
          <div className="text">STREET_LEVEL // PROTOCOL_K</div>
          <div className="sub-text">DATA_SYNC: ACTIVE // ACCESS_GRANTED</div>
        </div>
      </div>
    </div>
  );
};
