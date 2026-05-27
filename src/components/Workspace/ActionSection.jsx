import React from 'react';

export const ActionSection = ({ state, onAction }) => {
  const isVpe = state.currentUser?.role === 'VPE' || state.currentUser?.role === 'ADMIN';
  return (
    <>
      {state.status === 'planning' && isVpe && (
        <div className="card action-card start-meeting clickable" onClick={() => onAction('MEETING_START', 'live')}>
          <label>NEURAL LINK</label>
          <div className="val">START MEETING [INITIALIZE]</div>
        </div>
      )}
      
      {state.status === 'live' && isVpe && (
        <div className="card action-card stop-meeting clickable" onClick={() => onAction('status', 'planning')}>
          <label>SYSTEM CONTROL</label>
          <div className="val">END MEETING [TERMINATE]</div>
        </div>
      )}

      {state.registrationLink && (
        <div className="card action-card registration clickable" onClick={() => window.open(state.registrationLink, '_blank')}>
          <label>GATEWAY</label>
          <div className="val">GUEST REGISTRATION [OPEN]</div>
        </div>
      )}
    </>
  );
};