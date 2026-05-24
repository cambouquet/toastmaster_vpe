import React, { useState, useEffect } from 'react';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setPercent(progress);
      if (progress === 100) {
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
          <svg viewBox="0 0 100 100"><path d="M5 15h90v15H60v55H40V30H5V15z"/></svg>
        </div>
        <div className="hud-line">TOASTMASTER // NEURAL_LINK</div>
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
