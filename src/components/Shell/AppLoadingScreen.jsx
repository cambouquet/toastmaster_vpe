import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { getAppInfo } from '../../services/system/AppRegistry.jsx';
import './AppLoadingScreen.scss';

export const AppLoadingScreen = ({ app, onFinish, isInitial = false }) => {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);
  const { Icon, name } = getAppInfo(app);

  useEffect(() => {
    const duration = 2000, start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setPercent(p);
      if (p === 100) {
        clearInterval(tick);
        if (onFinish) {
          setTimeout(() => setComplete(true), 400);
          setTimeout(onFinish, 1000);
        }
      }
    }, 30);
    return () => clearInterval(tick);
  }, [onFinish]);

  return (
    <div className={`app-loading-overlay ${complete ? 'fade-out' : ''}`}>
      <div className="glitch-bg" />
      <div className="loading-content">
        <div className="sigil-pair">
          <div className="primary-logo-wrap"><Logo /></div>
          <div className="sigil-sep">//</div>
          <div className="app-logo-wrap"><Icon /></div>
        </div>
        
        <div className="hud-line"><span>INTERFACE SWITCH // {name}</span></div>
        <div className="load-bar-wrap"><div className="load-bar" style={{ width: `${percent}%` }} /></div>
        <div className="percent-row">
          <span className="digit">{percent}% // SYNCING DATA</span>
          <span className="mode">ACTIVE_SESSION</span>
        </div>
      </div>
    </div>
  );
};
