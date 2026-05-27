import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';
import { useMeetingSegments } from '../../hooks/useMeetingSegments';

export const StatusMeta = ({ user, online, total, hovered, AppIcon, state, uiAction }) => {
  const pseudo = user.name.split(' ')[0], roles = state?.roles || {}, active = state?.activeSegment || 0;
  const isTMOE = roles.toastmaster === user.name, segments = useMeetingSegments(roles);
  const onNext = (e) => { e.stopPropagation(); if (active < segments.length - 1) uiAction('activeSegment', active + 1); };
  return (
    <>
      <div className="t-group group-1">
        <div className="status-item-persistent" style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
        </div>
        <span className="sep px-1">//</span><SystemClock /><span className="sep px-1">//</span>
        <span className="val sm location-text">ANTIBES</span><span className="sep px-1">//</span><WeatherTelemetry />
      </div>
      <div className="desktop-spacer" style={{ width: 40 }} />
      <div className="t-group group-2 action-group">
        <div className="user-info-mini" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="val sm">{pseudo}</span><span className="sep px-1">/</span><span className="val sm dim">{user.role}</span>
        </div>
        {isTMOE && <><span className="sep px-1">//</span><button className="next-section-btn" onClick={onNext}>NEXT</button></>}
        <span className="sep px-1">//</span><NetworkSignal online={online} offline={total - online} />
        <span className="sep px-1">//</span><MessagingTelemetry unreadCount={0} />
      </div>
    </>
  );
};