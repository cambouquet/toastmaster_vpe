import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const [percent, setPercent] = useState(0), [complete, setComplete] = useState(false);
  useEffect(() => {
    const start = Date.now(), duration = 2500;
    const interval = setInterval(() => {
      const p = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setPercent(p);
      if (p === 100) {
        clearInterval(interval);
        setTimeout(() => setComplete(true), 400);
        setTimeout(onFinish, 1200);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`splash-overlay ${complete ? 'fade-out' : ''}`}>
      <div className="glitch-bg" />
      <div className="splash-core">
        <div className="sigil-wrap">
          <Logo style={{ width: 80, height: 80 }} />
        </div>
        <div className="hud-line">TOASTMASTER // LIBERATION KERNEL</div>
        <div className="load-bar-wrap">
          <div className="load-bar" style={{ width: `${percent}%` }} />
          <div className="load-percent">{percent}%</div>
        </div>
        <div className="status-log">
          {percent > 20 && <div>> INITIALIZING LIBERATION KERNEL</div>}
          {percent > 50 && <div>> BREAKING SYSTEM CONSTRAINTS</div>}
          {percent > 85 && <div>> FUTURE ACCESS GRANTED</div>}
        </div>
      </div>
    </div>
  );
};
