import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total, hovered, AppIcon }) => {
  const [status, setStatus] = React.useState('ONLINE');
  return (
    <>
      <div className="t-group">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
        </div>
        <span className="sep px-1">//</span>

        <SystemClock />
        {!hovered && (
          <>
            <span className="sep px-1">//</span>
            <WeatherTelemetry />
          </>
        )}
      </div>

      {hovered && (
        <>
          <span className="sep px-2">//</span>
          <div className="t-group">
            <span className="val sm dim">NIGHT CITY</span>
            <span className="sep px-1">//</span>
            <WeatherTelemetry />
          </div>

          <span className="sep px-2">//</span>

          <div className="t-group">
            <NetworkSignal online={online} offline={total - online} />
            <span className="sep px-1">//</span>
            <MessagingTelemetry unreadCount={0} />
          </div>

          <span className="sep px-2">//</span>

          <div className="t-group">
            <button 
              className="status-dot-btn"
              onClick={() => setStatus(status === 'ONLINE' ? 'OFFLINE' : 'ONLINE')}
              style={{ 
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                marginRight: '8px', display: 'flex', alignItems: 'center'
              }}
            >
              <div style={{ 
                width: 6, height: 6, borderRadius: '50%',
                background: status === 'ONLINE' ? '#00bac4' : '#ff3e3e',
                boxShadow: `0 0 8px ${status === 'ONLINE' ? '#00bac4' : '#ff3e3e'}`
              }} />
            </button>
            <span className="val">{user.name.split(' ')[0]}</span>
            <span className="val role-tag" style={{ marginLeft: 8 }}>{user.role}</span>
          </div>
        </>
      )}
    </>
  );
};