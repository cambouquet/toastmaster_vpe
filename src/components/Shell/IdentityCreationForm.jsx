import React from 'react';
import './IdentityCreationForm.scss';

export const IdentityCreationForm = ({ search, setSearch, onAuth }) => {
  const handleSync = () => {
    if (!search.trim()) return;
    onAuth('addMember', { 
      id: 'id-' + Date.now(), 
      name: search.trim(), 
      role: 'PENDING', 
      title: 'SYNCHRONIZED_USER', 
      status: 'STABLE' 
    });
  };

  return (
    <div className='neural-link-bootstrap rainbow-box'>
      <div className='header-glitch' data-text='CORE_IDENTITY_SYNC'>CORE_IDENTITY_SYNC</div>
      <div className='input-bracket'>
        <label>NEURAL_HANDLE</label>
        <input autoFocus spellCheck='false' value={search} 
          onChange={(e) => setSearch(e.target.value)} placeholder='ENTER_ALIAS...' 
          onKeyDown={(e) => e.key === 'Enter' && handleSync()} />
      </div>
      <button className={'sync-trigger ' + (search ? 'ready' : '')} onClick={handleSync}>
        <span>ESTABLISH_UPLINK</span>
      </button>
      <div className='telemetry-readout'>
        > AUTH_PROT: MAIN_STREAM // HANDSHAKE: PENDING // SIGNAL: OPTIMAL
      </div>
    </div>
  );
};
