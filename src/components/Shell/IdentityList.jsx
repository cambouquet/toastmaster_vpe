import React from 'react';
import { MEMBERS_DATA } from '../../data/members';

export const IdentityList = ({ search, setSearch, onAuth, onCreate }) => {
  const extras = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
  const all = [...MEMBERS_DATA, ...extras].filter(m => m.role !== 'GUEST');
  const filtered = all.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="search-box">
        <input autoFocus spellCheck="false" className="role-search" placeholder="IDENTIFY_USER..." 
          value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="scrollable">
        {filtered.length > 0 ? (
          <div className="members-grid">{filtered.map(m => (
            <button key={m.id} className="member-item" onClick={() => onAuth(m.id)}>
              <div className="avatar">{m.name.charAt(0)}</div>
              <div className="meta"><span className="name">{m.name}</span><span className="role">{m.role}</span></div>
            </button>
          ))}</div>
        ) : <div className="no-result">No identity matches found.</div>}
        <button className="create-opt" onClick={onCreate}>+ Create New User</button>
      </div>
    </>
  );
};
