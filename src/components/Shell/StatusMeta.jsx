import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total }) => (
  <div className="status-meta-group" style={{ whiteSpace: 'nowrap' }}>
    <span className="lbl">SYNC:</span><span className="val hi">{user.name.split(' ')[0]}</span>
    <span className="sep">|</span><SystemClock />
    <span className="sep">|</span><NetworkSignal online={online} offline={total - online} />
    <span className="sep">|</span><MessagingTelemetry unreadCount={0} />
  </div>
);