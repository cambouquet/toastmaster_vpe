import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const [role, setRole] = useState('WARRIOR');
  const [displayRole, setDisplayRole] = useState('WARRIOR');
  const [phase, setPhase] = useState('entering'); 

  useEffect(() => {
    const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];
    let roleIdx = 0;

    const t1 = setTimeout(() => setPhase('cycling'), 800);

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
      }
    }, 900);

    const t2 = setTimeout(() => {
      clearInterval(roleTimer);
      setRole('HUMAN');
      setDisplayRole('HUMAN');
      setPhase('exiting');
    }, 3800);

    const t3 = setTimeout(() => {
      onFinish();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(roleTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${phase}`}>
      <div className="scanner-line" />
      <div className="vignette" />
      
      <div className="splash-content">
        <div className="logo-glitch-container">
          <Logo />
          <div className="glitch-copy g1"><Logo /></div>
          <div className="glitch-copy g2"><Logo /></div>
        </div>

        <div className="motto-container">
          <div className="line-1">THE LIFE GAME</div>
          <div className="line-2">
            BECOME THE <span className="highlight" data-text={displayRole}>{displayRole}</span>
          </div>
          <div className="line-3">YOU'RE MEANT TO BE</div>
        </div>

        <div className="system-footer">
          <div className="rect" />
          <div className="text">STREET_LEVEL // PROTOCOL_K</div>
          <div className="rect" />
        </div>
      </div>
    </div>
  );
};
