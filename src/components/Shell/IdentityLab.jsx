import React, { useState } from 'react';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import { IdentityCreationForm } from './IdentityCreationForm';
import { KFontValidator } from './KFontValidator';
import './IdentityLab.scss';

export const IdentityLab = ({ state, onAuth }) => {
  const [search, setSearch] = useState('');
  const isAuth = state.currentUser?.role !== 'NONE' && state.currentUser?.name !== 'AUTHORIZATION REQUIRED';

  if (!isAuth) {
    return (
      <div className='workspace-screen identity-lab guest-mode'>
        <KFontValidator />
        <IdentityCreationForm search={search} setSearch={setSearch} onAuth={onAuth} />
        <div className='guest-footer'>[ UNREGISTERED_INTERNAL_UPLINK_077 ]</div>
      </div>
    );
  }

  return (
    <div className='workspace-screen identity-lab'>
      <AppHeader title='IDENTITY LAB' />
      <div className='workspace-grid'>
        <EditableCard label='SYSTEM IDENTITY' value={state.currentUser?.name || 'GUEST_USER'} />
        <EditableCard label='ACCESS LEVEL' value={state.currentUser?.role || 'UNAUTHORIZED'} />
        <EditableCard label='UPLINK STATUS' value={state.offline ? 'DISCONNECTED' : 'ENCRYPTED SYNC'} />
        <div className='card security-section'>
          <label>SECURITY MONITOR</label>
          <div className='status-grid'>
            <div className='status-box'><div className='label'>SYNC_STABILITY</div><div className='value'>100%</div></div>
            <div className='status-box'><div className='label'>ENCRYPTION</div><div className='value'>AES-256</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
