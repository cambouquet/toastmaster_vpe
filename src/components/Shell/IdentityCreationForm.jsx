import React, { useState } from 'react';

export const IdentityCreationForm = ({ search, setSearch, onAuth, onCancel }) => {
  const [role, setRole] = useState('MEMBER');
  const handleCreate = () => {
    if (!search.trim()) return;
    onAuth('addMember', { 
      id: `new-${Date.now()}`, name: search.trim(), role, 
      title: 'NEW MEMBER', status: 'ONLINE' 
    });
  };

  return (
    <div className="creation-form">
      <div className="form-header">:: IDENTITY_SIGNAL_GENERATOR</div>
      <div className="field-group">
        <span className="field-label">NAME</span>
        <input autoFocus spellCheck="false" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="..." />
      </div>
      <div className="field-group">
        <span className="field-label">CLASS</span>
        <div className="select-wrap">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="MEMBER">MEMBER</option>
            <option value="OFFICER">OFFICER</option>
            <option value="VPE">VPE (ROOT)</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button className="cancel" onClick={onCancel}>ABORT</button>
        <button className="confirm" onClick={handleCreate}>AUTHORIZE</button>
      </div>
    </div>
  );
};
