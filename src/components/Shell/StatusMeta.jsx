import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total }) => (
  <div className="status-meta-group synced-meta" style={{ whiteSpace: 'nowrap' }}>
    <div className="meta-item item-4">
      <span className="lbl">SYNC:</span>
      <span className="val hi">{user.name.split(' ')[0]}</span>
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-3">
      <SystemClock />
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-2">
      <NetworkSignal online={online} offline={total - online} />
    </div>
    <span className="sep">|</span>
    <div className="meta-item item-1">
      <MessagingTelemetry unreadCount={0} />
    </div>
  </div>
);