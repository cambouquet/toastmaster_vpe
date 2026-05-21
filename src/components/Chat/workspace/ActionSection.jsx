import React from 'react';

export const ActionSection = ({ state }) => (
  <>
    {state.registrationLink && (
      <div className="card action-card registration" onClick={() => window.open(state.registrationLink, '_blank')}>
        <label>GATEWAY</label>
        <div className="val">GUEST REGISTRATION [OPEN]</div>
      </div>
    )}
    {state.mapUrl && (
      <div className="card action-card map" onClick={() => window.open(state.mapUrl, '_blank')}>
        <label>LOCATOR</label>
        <div className="val">NAVIGATE TO VENUE</div>
      </div>
    )}
  </>
);