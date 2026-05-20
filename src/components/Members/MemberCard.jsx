import React from 'react';

export const MemberCard = ({ name }) => {
  // Random data for cyber feel
  const level = Math.floor(Math.random() * 5) + 1;
  const status = Math.random() > 0.3 ? 'ONLINE' : 'STDBY';

  return (
    <div className={`member-card ${status.toLowerCase()}`}>
      <div className="card-glitch-overlay"></div>
      <div className="member-info">
        <span className="name">{name.toUpperCase()}</span>
        <span className="metadata">PATHWAY: DYNAMIC_LEADERSHIP</span>
      </div>
      
      <div className="member-stats">
        <div className="stat">
          <label>LVL</label>
          <div className="progress-bar">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`segment ${i < level ? 'filled' : ''}`} />
            ))}
          </div>
        </div>
        <div className="status-indicator">{status}</div>
      </div>
    </div>
  );
};
