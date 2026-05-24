import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';
import { Logo } from './Logo';
import { MEMBERS_DATA } from '../../data/members';

const StatusGuest = ({ onAuth }) => (
  <button className="status-meta-group clickable" onClick={onAuth}>
    <span className="lbl">STATUS:</span><span className="val err">DISCONNECTED</span>
    <span className="sep">|</span>
    <span className="val dim sm scan">SYNC IN...</span>
  </button>
);

export const StatusReadout = ({ isAuth, user, currentApp, onToggleAuth, onToggleNav }) => {
  const online = MEMBERS_DATA.filter(m => m.status === 'ONLINE').length;
  const offline = MEMBERS_DATA.length - online;
  const appName = currentApp === 'mission-control' ? 'MISSION CONTROL' : 'TOASTMASTER';

  return (
    <div className="status-content">
      <div onClick={onToggleNav} style={{ cursor: 'pointer', display: 'flex' }}>
        <Logo scan={!isAuth} />
      </div>
      <span className="app-name">{appName}</span>
      <span className="sep px-2">//</span>
      {!isAuth ? <StatusGuest onAuth={onToggleAuth} /> : (
        <div className="status-meta-group" style={{ whiteSpace: 'nowrap' }}>
          <span className="lbl">ID:</span><span className="val hi">{user.name}</span>
          <span className="sep">·</span><span className="val sm dim">{user.role}</span>
          <span className="sep">|</span><SystemClock /><span className="sep">|</span>
          <WeatherTelemetry /><span className="sep">|</span>
          <span className="val hi sm">TOKYO</span><span className="sep">|</span>
          <NetworkSignal online={online} offline={offline} />
          <span className="sep">|</span><MessagingTelemetry unreadCount={0} />
        </div>
      )}
    </div>
  );
};
