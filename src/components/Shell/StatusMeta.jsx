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
        <div className="user-info-mini" style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
          <span className="val sm">{pseudo}</span>
          <span className="sep px-1">/</span>
          <span className="val sm dim">{user.role}</span>
        </div>
        <span className="sep px-1">//</span>
        <NetworkSignal online={online} offline={total - online} />
        <span className="sep px-1">//</span>
        <MessagingTelemetry unreadCount={0} />
      </div>

      <div className="t-group group-2">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
        </div>
        <span className="sep px-1">//</span>
        <SystemClock />
        <span className="sep px-1">//</span>
        <div className="mobile-hide">
          <span className="val sm dim">NIGHT CITY</span>
          <span className="sep px-1">//</span>
        </div>
        <WeatherTelemetry />
      </div>
    </>
  );
};