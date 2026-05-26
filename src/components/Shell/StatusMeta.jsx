import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total, hovered, AppIcon }) => {
  const pseudo = user.name.split(' ')[0];

  return (
    <>
      <div className="t-group group-1">
        <div className="status-item-persistent" style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
        </div>
        <span className="sep px-1">//</span>
        <SystemClock />
        <span className="sep px-1">//</span>
        <span className="val sm location-text">ANTIBES</span>
        <span className="sep px-1">//</span>
        <WeatherTelemetry />
      </div>

      <div className="desktop-spacer" style={{ width: 40 }} />

      <div className="t-group group-2 action-group">
        <div className="user-info-mini" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="val sm">{pseudo}</span>
          <span className="sep px-1">/</span>
          <span className="val sm dim">{user.role}</span>
        </div>
        <span className="sep px-1">//</span>
        <NetworkSignal online={online} offline={total - online} />
        <span className="sep px-1">//</span>
        <MessagingTelemetry unreadCount={0} />
      </div>
    </>
  );
};