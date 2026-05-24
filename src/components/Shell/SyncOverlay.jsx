import React from 'react';
import './SyncOverlay.scss';

export const SyncOverlay = ({ progress, type = 'in' }) => {
  const isIn = type === 'in';
  return (
    <div className={`sync-overlay ${!isIn ? 'sync-out' : ''}`}>
      <div className="sync-lines" />
      <div className="sync-core">
        <div className="outer" />
        <div className="inner" />
        <div className="pulse" />
      </div>
      <div className="sync-status">
        <div className="title">
          {isIn ? 'SYNCHRONIZING AI CORE' : 'DESYNCHRONIZING AI CORE'}
        </div>
        <div className="progress">
          {progress}% // {isIn ? 'UPLOADING PROFILE' : 'PURGING PROFILE'}
        </div>
      </div>
    </div>
  );
};
