import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ToastmasterLogo } from './ToastmasterLogo';
import './AppLoadingScreen.scss';

export const AppLoadingScreen = ({ app, onFinish, isInitial = false }) => {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);
  const isTM = app === 'toastmaster';
  const appLabel = isTM ? 'TOASTMASTER' : 'MISSION CONTROL';

  useEffect(() => {
    const duration = isInitial ? 2500 : 2000;
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setPercent(p);
      if (p === 100) {
        clearInterval(interval);
        if (onFinish) {
          setTimeout(() => setComplete(true), 400);
          setTimeout(onFinish, 1000);
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish, isInitial]);

  return (
    <div className={`app-loading-overlay ${complete ? 'fade-out' : ''}`}>
      <div className="glitch-bg" />
      <div className="loading-content">
        <div className="sigil-pair">
          <div className="sigil-main">
            <Logo style={{ width: 80, height: 80 }} scan={true} />
          </div>
          <div className="sigil-sep">//</div>
          <div className={`sigil-app ${isTM ? 'tm' : 'mc'}`}>
            {isTM ? <ToastmasterLogo style={{ width: 60, height: 60 }} /> : <Logo style={{ width: 60, height: 60 }} />}
          </div>
        </div>
        <div className="hud-line">
          <span className="title">{isInitial ? 'INITIALIZING' : 'INTERFACE SWITCH'}</span>
          <span className="sep">//</span>
          <span className="subject">{appLabel}</span>
        </div>
        <div className="load-bar-wrap">
          <div className="load-bar" style={{ width: `${percent}%` }} />
        </div>
        <div className="percent-row">
          <span className="digit">{percent}% // {isInitial ? 'LOADING APP' : 'SYNCING DATA'}</span>
          <span className="mode">{!isInitial && 'ACTIVE_SESSION'}</span>
        </div>
      </div>
    </div>
  );
};
