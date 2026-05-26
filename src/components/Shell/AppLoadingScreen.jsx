import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { getAppInfo } from '../../services/system/AppRegistry.jsx';
import './AppLoadingScreen.scss';

export const AppLoadingScreen = ({ app, onFinish, isInitial = false }) => {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);
  const [role, setRole] = useState('WARRIOR');
  const { Icon, name } = getAppInfo(app);

  useEffect(() => {
    const roles = ['WARRIOR', 'WOMAN', 'HUMAN'];
    let roleIdx = 0;
    const roleTimer = setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      setRole(roles[roleIdx]);
    }, 800);

    const duration = isInitial ? 3500 : 2000, start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setPercent(p);
      if (p === 100) {
        clearInterval(tick);
        clearInterval(roleTimer);
        setRole('HUMAN');
        if (onFinish) {
          setTimeout(() => setComplete(true), 400);
          setTimeout(onFinish, 1000);
        }
      }
    }, 30);
    return () => { clearInterval(tick); clearInterval(roleTimer); };
  }, [onFinish, isInitial]);

  return (
    <div className={`app-loading-overlay ${complete ? 'fade-out' : ''}`}>
      <div className="glitch-bg" />
      <div className="loading-content">
        <div className="sigil-pair">
          <div className="primary-logo-wrap"><Logo /></div>
        </div>
        
        <div className="motto-wrap">
          <div className="motto-main">THE LIFE GAME</div>
          <div className="motto-sub">BECOME THE <span className="cycle-role">{role}</span> YOU'RE MEANT TO BE</div>
        </div>

        <div className="hud-line"><span>{isInitial ? 'INITIALIZING' : 'INTERFACE SWITCH'} // {name}</span></div>
        <div className="load-bar-wrap"><div className="load-bar" style={{ width: `${percent}%` }} /></div>
        <div className="percent-row">
          <span className="digit">{percent}% // {isInitial ? 'LOADING APP' : 'SYNCING DATA'}</span>
          <span className="mode">{!isInitial && 'ACTIVE_SESSION'}</span>
        </div>
      </div>
    </div>
  );
};
