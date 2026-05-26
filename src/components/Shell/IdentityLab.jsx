import React, { useState } from 'react';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import { IdentityCreationForm } from './IdentityCreationForm';
import { KFontValidator } from './KFontValidator';
import { Logo } from './Logo';
import { KIdBrand } from './KIdBrand';
import { VirtualKeyboard } from './VirtualKeyboard';
import './IdentityLab.scss';

export const IdentityLab = ({ state, onAuth }) => {
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('alias'); // alias | password
  
  const members = state.members || [];
  const currentUser = state.currentUser;
  const isSyncing = currentUser?.role !== 'NONE' && currentUser?.name !== 'AUTHORIZATION REQUIRED';
  const nameTaken = members.some(m => m.name.toUpperCase() === alias.toUpperCase());

  const handleAuth = () => {
    if (isSyncing) return;
    if (alias && password && !nameTaken) {
      onAuth('addMember', { 
        id: 'kid-' + Date.now(), 
        name: alias.toUpperCase(), 
        password: password, 
        role: 'K-USER', 
        title: 'K-IDENTITY VERIFIED', 
        status: 'STABLE' 
      });
    }
  };

  const handleKey = (char) => {
    if (isSyncing) return;
    if (step === 'alias') {
      if (alias.length < 12) setAlias(prev => prev + char);
    } else {
      if (password.length < 12) setPassword(prev => prev + char);
    }
  };

  const handleBackspace = () => {
    if (isSyncing) return;
    if (step === 'alias') setAlias(prev => prev.slice(0, -1));
    else setPassword(prev => prev.slice(0, -1));
  };

  const isReady = step === 'alias' ? (alias && !nameTaken) : (password.length >= 4);

  return (
    <div className={`workspace-screen identity-lab guest-mode ${isSyncing ? 'synced' : ''}`}>
      <div className='background-logo'><Logo /></div>

      <div className='neural-link-bootstrap'>
        <div className='id-wordmark'>
          {isSyncing ? (
            <div className='synced-status'>
              <div className='label'>CONNECTION_STABLE</div>
              <KIdBrand className='brand-svg' text={currentUser?.name || "K-ID"} />
              <div className='sub-label'>{currentUser?.role} // {currentUser?.title}</div>
            </div>
          ) : step === 'alias' ? (
            <KIdBrand className='brand-svg' text={alias || "K-ID"} isTaken={nameTaken} />
          ) : (
            <div className='password-display'>
              <div className='label'>SECURE_PASSCODE</div>
              <div className='dots'>{"*".repeat(password.length) || "----"}</div>
            </div>
          )}
        </div>

        {!isSyncing && (
          <>
            <div className='step-indicator'>
              <div className={`dot ${step === 'alias' ? 'active' : ''}`} />
              <div className={`dot ${step === 'password' ? 'active' : ''}`} />
            </div>

            <VirtualKeyboard 
              onKey={handleKey} 
              onBackspace={handleBackspace} 
              disabled={isSyncing} 
              nameTaken={nameTaken} 
              step={step} 
            />

            {step === 'alias' ? (
              <button 
                className={`sync-trigger ${isReady ? 'ready' : ''}`} 
                onClick={() => isReady && setStep('password')}
                disabled={!isReady}
              >
                <span>{nameTaken ? 'IDENTITY TAKEN' : 'SET PASSCODE'}</span>
              </button>
            ) : (
              <div className='action-stack'>
                <button className='sync-trigger ready' onClick={handleAuth}>
                  <span>SYNC IDENTITY</span>
                </button>
                <button className='back-trigger' onClick={() => setStep('alias')}>
                  REVISE ALIAS
                </button>
              </div>
            )}
          </>
        )}

        {isSyncing && (
          <div className='sync-success'>
            <div className='success-icon'>✓</div>
            <div className='success-text'>UPLINK ACTIVE</div>
            <button className='sync-trigger ready' style={{ marginTop: '20px' }} onClick={() => onAuth('logout')}>
              <span>TERMINATE LINK</span>
            </button>
          </div>
        )}
      </div>

      <div className='guest-footer'>NEURAL_LINK // BOOTSTRAP_PROTOCOL_v4.2</div>
    </div>
  );
};
