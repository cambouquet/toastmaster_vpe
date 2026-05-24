import React from 'react';

export const NetworkSignal = ({ online, offline }) => (
  <div className="sync-signal">
    <div className="status-dot" />
    <span className="val ok sm" style={{ marginLeft: '4px' }}>{online}</span>
    <span className="sep" style={{ margin: '0 2px', opacity: 0.2 }}>:</span>
    <span className="val sm" style={{ opacity: 0.3 }}>{offline}</span>
  </div>
);
