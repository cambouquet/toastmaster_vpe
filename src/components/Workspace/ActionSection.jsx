import React from 'react';

export const ActionSection = ({ state }) => (
  <>
    {state.registrationLink && (
      <div className="card action-card registration" onClick={() => window.open(state.registrationLink, '_blank')}>
        <label>GATEWAY</label>
        <div className="val">GUEST REGISTRATION [OPEN]</div>
      </div>
    )}
  </>
);