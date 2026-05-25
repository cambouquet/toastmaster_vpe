import React from 'react';
import { SystemClock } from './SystemClock';
import { NetworkSignal } from './NetworkSignal';
import { MessagingTelemetry } from './MessagingTelemetry';
import { WeatherTelemetry } from './WeatherTelemetry';

export const StatusMeta = ({ user, online, total, hovered, AppIcon }) => {
  const [status, setStatus] = React.useState('ONLINE');
  return (
    <>
      <div className="t-group group-1">
        <div className="neural-wave" style={{ '--wave-idx': 5 }}>
          {AppIcon && <AppIcon scan={true} style={{ width: 14, height: 14, opacity: 0.9 }} />}
        </div>
        <span className="sep px-1">//</span>
        <SystemClock />
      </div>

      <div className="t-group group-2">
        <span className="sep px-2">//</span>
        <span className="val sm dim mobile-hide">NIGHT CITY</span>
        <span className="sep px-1 mobile-hide">//</span>
        <WeatherTelemetry />
      </div>

      <div className="t-group group-3">
        <span className="sep px-2">//</span>
        <NetworkSignal online={online} offline={total - online} />
        <span className="sep px-1">//</span>
        <MessagingTelemetry unreadCount={0} />
      </div>
    </>
  );
};
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