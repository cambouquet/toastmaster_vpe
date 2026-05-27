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
          <Logo primaryColor={colors.logoPrimary} glowColor={colors.logoGlow} />
        </div>
        <div className="motto-container" style={{ borderLeftColor: colors.border }}>
          <div className="line-1" style={{ color: colors.line1 }}>THE LIFE GAME</div>
          <div className="line-2" style={{ color: colors.line2 }}>
            BECOME THE <span className="highlight" style={{ 
              background: colors.highlightBg, 
              color: colors.highlightBg === '#ffffff' || colors.highlightBg === '#fcee0a' ? '#000' : '#fff' 
            }}>{displayRole}</span>
          </div>
          <div className="line-3" style={{ color: colors.line3 }}>YOU'RE MEANT TO BE</div>
        </div>
      </div>
    </div>
  );
};
