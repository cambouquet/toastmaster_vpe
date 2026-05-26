import React from 'react';

export const IdentityLabActions = ({ step, nameTaken, isReady, onStep, onAuth }) => (
  <div className="identity-actions">
    {step === 'alias' ? (
      <button 
        className={`sync-trigger ${isReady ? 'ready' : ''}`} 
        onClick={() => isReady && onStep('password')}
        disabled={!isReady}
      >
        <span>{nameTaken ? 'CONFLICT: ALIAS_TAKEN' : 'INITIATE_HANDSHAKE'}</span>
      </button>
    ) : (
      <div className='action-stack'>
        <button className='sync-trigger ready' onClick={onAuth}>
          <span>AUTHORIZE_UPLINK</span>
        </button>
        <button className='back-trigger' onClick={() => onStep('alias')}>
          REVISE ALIAS
        </button>
      </div>
    )}
  </div>
);
