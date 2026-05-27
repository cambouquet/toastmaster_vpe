import React from 'react';
import { Logo } from './Logo';
import { useSplashSequence } from '../../hooks/useSplashSequence';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const { phase, displayRole, colors } = useSplashSequence(onFinish);
  return (
    <div className={`splash-screen phase-${phase}`}>
      <div className="scanner-line" /><div className="vignette" />
      <div className="splash-content">
        <div className="logo-glitch-container">
          <Logo primaryColor={colors.group3} glowColor={colors.group1} />
        </div>
        <div className="motto-container" style={{ borderLeftColor: colors.group3 }}>
          <div className="line-1" style={{ color: colors.group2 }}>THE LIFE GAME</div>
          <div className="line-2" style={{ color: colors.group3 }}>
            BECOME THE <span className="highlight" style={{ 
              background: colors.group2, 
              color: colors.group2 === '#ffffff' || colors.group2 === '#fcee0a' ? '#000' : '#fff' 
            }}>{displayRole}</span>
          </div>
          <div className="line-3" style={{ color: colors.group1 }}>YOU'RE MEANT TO BE</div>
        </div>
      </div>
    </div>
  );
};
