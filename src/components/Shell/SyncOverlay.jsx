import React from 'react';
import './SyncOverlay.scss';

export const SyncOverlay = ({ progress, type = 'in', title: customTitle, failed = false }) => {
  const isIn = type === 'in';
  return (
    <div className={`sync-overlay ${!isIn ? 'sync-out' : ''} ${failed ? 'mode-failed' : ''}`}>
      <div className="sync-lines" />
      <div className="sync-core">
        <div className="outer" />
        <div className="inner" />
        <div className="pulse" />
      </div>
      <div className="sync-status">
        <div className="title">
          {failed ? 'SIGNAL INTERRUPTED' : (customTitle || (isIn ? 'SYNCHRONIZING AI CORE' : 'DESYNCHRONIZING AI CORE'))}
        </div>
        <div className="progress">
          {failed ? 'FALLING BACK TO LOCAL' : `${progress}% // ${isIn ? 'UPLOADING PROFILE' : 'PURGING PROFILE'}`}
        </div>
      </div>
    </div>
  );
};
