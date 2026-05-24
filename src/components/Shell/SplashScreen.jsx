import React, { useState, useEffect } from 'react';
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
      <div className="glitch-bg" /><div className="splash-core">
        <div className="sigil-wrap">
          <svg viewBox="0 0 100 100">
            <path d="M10 10h18v80H10z" /><path d="M28 42L70 10h20L43 50z" /><path d="M43 50l47 40H70L28 58z" />
          </svg>
        </div>
        <div className="hud-line">TOASTMASTER // NEURAL LINK</div>
        <div className="load-bar-wrap">
          <div className="load-bar" style={{ width: `${percent}%` }} />
          <div className="load-percent">{percent}%</div>
        </div>
        <div className="status-log">
          {percent > 20 && <div>> INITIALIZING VPE KERNEL</div>}
          {percent > 50 && <div>> ESTABLISHING SECURE UPLINK</div>}
          {percent > 85 && <div>> NEURAL HANDSHAKE SUCCESS</div>}
        </div>
      </div>
    </div>
  );
};
