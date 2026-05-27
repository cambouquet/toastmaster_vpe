import React from 'react';
export const StatusGuest = ({ onAuth }) => (
  <div className="status-guest-link" onClick={(e) => { e.stopPropagation(); onAuth(); }}>
    <span className="val sm">Guest</span>
    <span className="sep px-1">/</span>
    <span className="val sm dim pulse-cyan">sync in...</span>
  </div>
);