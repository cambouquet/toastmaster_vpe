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
          <Logo style={{ width: 100, height: 100 }} scan={true} />
        </div>
        <div className="hud-line">TOASTMASTER // CONNECTING</div>
        <div className="load-bar-wrap">
          <div className="load-bar" style={{ width: `${percent}%` }} />
          <div className="load-percent">{percent}%</div>
        </div>
        <div className="status-log">
          {percent > 10 && <div>INITIALIZING SYSTEM</div>}
          {percent > 40 && <div>CONNECTING TO NETWORK...</div>}
          {percent > 70 && <div>ENCRYPTED SYNC ESTABLISHED</div>}
          {percent > 90 && <div>WELCOME TO TOASTMASTER</div>}
        </div>
      </div>
    </div>
  );
};
