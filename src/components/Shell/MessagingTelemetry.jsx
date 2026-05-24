import React from 'react';

export const MessagingTelemetry = ({ unreadCount }) => (
  <div className="msg-indicator">
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
    <span className={`val sm ${unreadCount > 0 ? 'hi' : 'dim'}`}>
      {unreadCount}
    </span>
  </div>
);
