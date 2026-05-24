import React from 'react';
import './SyncOverlay.scss';

export const SyncOverlay = ({ progress }) => (
  <div className="sync-overlay">
    <div className="sync-lines" />
    <div className="sync-core">
      <div className="outer" />
      <div className="inner" />
      <div className="pulse" />
    </div>
    <div className="sync-status">
      <div className="title">UPLINK ESTABLISHING</div>
      <div className="progress">{progress}% // VERIFYING NODES</div>
    </div>
  </div>
);
