import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total }) => {
  const [status, setStatus] = React.useState('ONLINE');
  return (
    <>
      <span className="sep px-2">//</span>
      <div className="t-group">
        <SystemClock />
        <span className="sep px-1">//</span>
        <span className="val sm dim">NIGHT CITY // EARTH</span>
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
  );
};