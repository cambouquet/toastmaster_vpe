import React from 'react';
import { KIdBrand } from './KIdBrand';
import './IdentityCreationForm.scss';

export const IdentityCreationForm = ({ search, setSearch, onAuth }) => {
  const handleSync = () => {
    if (!search.trim()) return;
    onAuth('addMember', { 
      id: 'kid-' + Date.now(), 
      name: search.trim(), 
      role: 'K-USER', 
      title: 'K-IDENTITY VERIFIED', 
      status: 'STABLE' 
    });
  };

  return (
    <div className='neural-link-bootstrap rainbow-box'>
      <div className='id-wordmark'>
        <KIdBrand className='brand-svg' />
      </div>
      <div className='input-bracket'>
        <input autoFocus spellCheck='false' value={search} 
          onChange={(e) => setSearch(e.target.value)} placeholder='SPECIFY ALIAS' 
          onKeyDown={(e) => e.key === 'Enter' && handleSync()} />
      </div>
      <button className={'sync-trigger ' + (search ? 'ready' : '')} onClick={handleSync}>
        <span>SYNC</span>
      </button>
    </div>
  );
};
