import React from 'react';
import { Logo } from './Logo';
import { useSplashSequence } from '../../hooks/useSplashSequence';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const { phase, displayRole } = useSplashSequence(onFinish);
  return (
    <div className={`splash-screen phase-${phase}`}>
      <div className="scanner-line" /><div className="vignette" />
      <div className="splash-content">
        <div className="logo-glitch-container"><Logo /></div>
        <div className="motto-container">
          <div className="line-1">THE LIFE GAME</div>
          <div className="line-2">BECOME THE <span className="highlight">{displayRole}</span></div>
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
