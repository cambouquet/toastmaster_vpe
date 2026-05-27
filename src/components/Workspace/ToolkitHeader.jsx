import React from 'react';

export const ToolkitHeader = ({ setLocalIdx, localIdx, segments, current, running, isGlobal }) => (
  <div className="session-header">
    <div className="session-nav">
      <div className="nav-group">
        <button className="nav-btn" onClick={() => setLocalIdx(Math.max(0, localIdx - 1))}>‹</button>
        <button className="nav-btn" onClick={() => setLocalIdx(Math.min(segments.length - 1, localIdx + 1))}>›</button>
      </div>
      <span className="session-label">{current.member}</span>
      <span className="session-status">{running && isGlobal ? 'LISTENING' : 'IDLE'}</span>
    </div>
    <div className="session-member-group">
      <span className="session-member">{current.label}</span>
      {current.title && <span className="session-title">{current.title}</span>}
    </div>
  </div>
);