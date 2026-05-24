import React from 'react';

export const WeatherTelemetry = () => (
  <div className="weather-indicator" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      <circle cx="12" cy="12" r="4" />
    </svg>
    <span className="val sm" style={{ opacity: 0.3 }}>24°C</span>
  </div>
);
