import React, { useState } from 'react';
import { Logo } from './Logo';
import { VirtualKeyboard } from './VirtualKeyboard';
import { IdentityLabDisplay } from './IdentityLabDisplay';
import { IdentityLabActions } from './IdentityLabActions';
import './IdentityLab.scss';

export const IdentityLab = ({ state, onAuth }) => {
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('alias');
  const user = state.currentUser;
  const isSyncing = user?.role !== 'NONE' && user?.name !== 'AUTHORIZATION REQUIRED';
  const nameTaken = (state.members || []).some(m => m.name.toUpperCase() === alias.toUpperCase());

  const handleAuth = () => {
    if (isSyncing || !(alias && password && !nameTaken)) return;
    onAuth('addMember', { id: `kid-${Date.now()}`, name: alias.toUpperCase(), password, role: 'K-USER', title: 'K-IDENTITY VERIFIED', status: 'STABLE' });
  };

  const handleKey = (char) => {
    if (isSyncing) return;
    if (step === 'alias' ? alias.length < 12 : password.length < 12) {
      step === 'alias' ? setAlias(a => a + char) : setPassword(p => p + char);
    }
  };

  const handleBS = () => step === 'alias' ? setAlias(a => a.slice(0, -1)) : setPassword(p => p.slice(0, -1));

  return (
    <div className={`workspace-screen identity-lab guest-mode ${isSyncing ? 'synced' : ''}`}>
      <div className='background-logo'><Logo /></div>
      <div className='neural-link-bootstrap'>
        <IdentityLabDisplay isSyncing={isSyncing} user={user} step={step} alias={alias} password={password} nameTaken={nameTaken} />
        {!isSyncing && (
          <>
            <div className='step-indicator'><div className={`dot ${step === 'alias' ? 'active' : ''}`} /><div className={`dot ${step === 'password' ? 'active' : ''}`} /></div>
            <VirtualKeyboard onKey={handleKey} onBackspace={handleBS} disabled={isSyncing} nameTaken={nameTaken} step={step} />
            <IdentityLabActions step={step} nameTaken={nameTaken} isReady={step === 'alias' ? (alias && !nameTaken) : (password.length >= 4)} onStep={setStep} onAuth={handleAuth} />
          </>
        )}
        {isSyncing && <div className='sync-success'><div className='success-icon'>✓</div><div className='success-text'>CONNECTION_STABLE</div><button className='sync-trigger ready' onClick={() => onAuth('logout')}><span>TERMINATE_CONNECTION</span></button></div>}
      </div>
      <div className='guest-footer'>PERSONAL_LINK // K-NET_UPLINK_77</div>
    </div>
  );
};
