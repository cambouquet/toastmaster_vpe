import React from 'react';

export const ActionSection = ({ state, onAction }) => (
  <>
    {state.status === 'planning' && (
      <div className="card action-card start-meeting" onClick={() => onAction('status', 'live')}>
        <label>NEURAL LINK</label>
        <div className="val">START MEETING [INITIALIZE]</div>
      </div>
    )}
    
    {state.status === 'live' && (
      <div className="card action-card stop-meeting" onClick={() => onAction('status', 'planning')}>
        <label>SYSTEM CONTROL</label>
        <div className="val">END MEETING [TERMINATE]</div>
      </div>
    )}

    {state.registrationLink && (
      <div className="card action-card registration" onClick={() => window.open(state.registrationLink, '_blank')}>
        <label>GATEWAY</label>
        <div className="val">GUEST REGISTRATION [OPEN]</div>
      </div>
    )}
  </>
);