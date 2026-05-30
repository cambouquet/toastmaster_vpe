import React from 'react';
import { KIdBrand } from './KIdBrand';

export const IdentityLabDisplay = ({ isSyncing, user, step, alias, password, nameTaken }) => {
  if (isSyncing) return (
    <div className='synced-status'>
      <div className='label'>UPLINK SYNC ACTIVE</div>
      <KIdBrand className='brand-svg' text={user?.name || "K-ID"} />
      <div className='sub-label'>{user?.role} // {user?.title}</div>
    </div>
  );

  return (
    <div className='id-wordmark'>
      {step === 'alias' ? (
        <KIdBrand className='brand-svg' text={alias || "K-ID"} isTaken={nameTaken} />
      ) : (
        <div className='password-display'>
          <div className='label'>UPLINK KEY GEN</div>
          <div className='dots'>{"*".repeat(password.length) || "----"}</div>
        </div>
      )}
    </div>
  );
};
