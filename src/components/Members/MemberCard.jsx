import React, { useState } from 'react';
import { PATHWAYS } from '../../constants/pathways';
import { PathwayNode } from './PathwayNode';

export const MemberCard = ({ member, onEdit, onDelete }) => {
  const { id, name, enrolled = [], status } = member;
  const [editing, setEditing] = useState(false);
  const up = (u) => onEdit({ id, updates: u });

  const setItem = (idx, updates) => {
    const next = [...enrolled];
    next[idx] = { ...next[idx], ...updates };
    up({ enrolled: next });
  };

  const addPth = (n) => up({ enrolled: [...enrolled, { name: n, level: 1 }] });
  const delPth = (idx) => up({ enrolled: enrolled.filter((_, i) => i !== idx) });

  return (
    <div className={`member-card ${status.toLowerCase()} ${editing ? 'edit' : ''}`} onClick={() => setEditing(!editing)}>
      <button className="purge-btn" onClick={e => { e.stopPropagation(); onDelete(id); }}><svg viewBox="0 0 24 24" width="12"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2,0,0,0,8,21H16A2,2,0,0,0,18,19V7H6V19Z" /></svg></button>
      <div className="member-info">
        {editing ? <input autoFocus className="name-in" value={name} onClick={e => e.stopPropagation()} onChange={e => up({ name: e.target.value.toUpperCase() })} /> : <span className="name">{name?.toUpperCase()}</span>}
        <div className="enrolled-list" onClick={e => e.stopPropagation()}>
          {enrolled.map((p, i) => (
            <PathwayNode key={i} item={p} onUpdate={(u) => setItem(i, u)} onRemove={() => delPth(i)} />
          ))}
          <PathwayNode isNew available={PATHWAYS.filter(p => !enrolled.find(e => e.name === p))} onUpdate={addPth} />
        </div>
      </div>
      <div className={`status-indicator ${status.toLowerCase()}`} onClick={e => { e.stopPropagation(); up({ status: status === 'ONLINE' ? 'AWAY' : 'ONLINE' }); }}>{status === 'STDBY' ? 'AWAY' : status}</div>
    </div>
  );
};
