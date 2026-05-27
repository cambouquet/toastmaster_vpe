import React from 'react';

export const GuestBroadcast = ({ format, isGlobal, time, getTarget }) => (
  <div className="guest-broadcast">
    <div className="public-timer">
      <div className="timer-display centering large">{format(isGlobal ? time : 0)}</div>
      <div className="target-notif">TARGET: {getTarget()}</div>
    </div>
  </div>
);