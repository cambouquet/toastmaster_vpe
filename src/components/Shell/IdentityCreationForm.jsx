import React from 'react';
import { KIdBrand } from './KIdBrand';
import './IdentityCreationForm.scss';

export const IdentityCreationForm = ({ search, setSearch, onAuth }) => {
  const handleSync = () => {
    if (!search.trim()) return;
    onAuth('addMember', { 
      id: 'k-' + Date.now(), 
      name: search.trim(), 
      role: 'UPLINK_USER', 
      title: 'UPLINK VERIFIED', 
      status: 'STABLE' 
    });
  };

  const placeholder = React.useMemo(() => {
    const options = ['GHOST_PROTOCOL', 'UPLINK_ID', 'LOGIN_KEY', 'USER_HANDLE', 'IDENTITY_SIGNATURE'];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  return (
    <div className='uplink-bootstrap rainbow-box'>
      <div className='id-wordmark'>
        <KIdBrand className='brand-svg' />
      </div>
      <div className='input-bracket'>
        <input autoFocus spellCheck='false' value={search} 
          onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} 
          onKeyDown={(e) => e.key === 'Enter' && handleSync()} />
      </div>
      <button className={'sync-trigger ' + (search ? 'ready' : '')} onClick={handleSync}>
        <span>SYNC</span>
      </button>
    </div>
  );
};
