import React from 'react';

export const ActionSection = ({ state, onAction }) => {
  const isOrganizer = state.currentUser?.role === 'ORGANIZER' || state.currentUser?.role === 'ADMIN';
  return (
    <>
      {state.status === 'planning' && isOrganizer && (
        <div className="card action-card start-meeting clickable" onClick={() => onAction('MEETING_START', 'live')}>
          <label>UPLINK LINK</label>
          <div className="val">START MEETING [INITIALIZE]</div>
        </div>
      )}
      
      {state.status === 'live' && isOrganizer && (
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