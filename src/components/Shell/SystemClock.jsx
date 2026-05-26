import React, { useState, useEffect } from 'react';
import './SystemClock.scss';

export const SystemClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const Gauge = ({ p, t }) => (
    <div className="clock-visual">
      <svg viewBox="0 0 24 24" className="spinner">
         <circle cx="12" cy="12" r="10" stroke="rgba(0,186,196,0.15)" fill="none" strokeWidth="2" />
         <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="62.8" strokeDashoffset={62.8 - p} />
      </svg><div className="clock-tooltip">{t}</div>
    </div>
  );
  const pr = (v, m) => (v * 62.8) / m;
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  return (
    <div className="system-clock">
      <div className="clock-gauges" style={{ display: 'flex', gap: 4 }}>
        <Gauge p={pr(now.getSeconds(), 60)} t={`SEC: ${now.getSeconds()}`} />
        <Gauge p={pr(now.getMinutes(), 60)} t={`MIN: ${now.getMinutes()}`} />
        <Gauge p={pr(now.getHours(), 24)} t={`HR: ${now.getHours()}`} />
        <div className="mobile-hide" style={{ display: 'flex', gap: 4 }}>
          <Gauge p={pr(now.getDate(), days)} t={`DAY: ${now.getDate()}`} />
          <Gauge p={pr(now.getMonth() + 1, 12)} t={`MO: ${now.getMonth() + 1}`} />
        </div>
      </div>
    </div>
  );
};
    </div>
  );
};
