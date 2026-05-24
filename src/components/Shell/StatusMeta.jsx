import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total }) => (
  <div className="status-meta-group synced-meta" style={{ whiteSpace: 'nowrap' }}>
    <div className="meta-item item-3">
      <SystemClock />
    </div>
    <span className="sep">|</span>
    <div className="meta-item" style={{ opacity: 0.3 }}>
      <span className="val sm">NIGHT CITY // EARTH</span>
    </div>
    <span className="sep">|</span>
    <div className="meta-item">
      <WeatherTelemetry />
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-2">
      <NetworkSignal online={online} offline={total - online} />
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-1">
      <MessagingTelemetry unreadCount={0} />
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-4">
      <span className="val hi">{user.name.split(' ')[0]}</span>
      <span className="sep" style={{ margin: '0 4px', opacity: 0.5 }}>//</span>
      <span className="val sm dim">{user.role}</span>
    </div>
  </div>
);