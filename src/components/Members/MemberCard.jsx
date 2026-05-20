import React, { useState } from 'react';
import { PATHWAYS } from '../../constants/pathways';

export const MemberCard = ({ member, onEdit, onDelete }) => {
  const { id, name, pathways, level, status } = member;
  const [editing, setEditing] = useState(false);
  const up = (u) => onEdit({ id, updates: u });

  const Lvl = () => (
    <div className="lvl-ctrl" onClick={e => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map(v => (
        <div key={v} className={`seg ${v <= level ? 'f' : ''}`} onClick={() => up({ level: v })} />
      ))}
    </div>
  );

  const Pths = () => (
    <div className="pth-tags" onClick={e => e.stopPropagation()}>
      {(pathways || []).map(p => (
        <span key={p} className="tag" onClick={() => up({ pathways: pathways.filter(x => x !== p) })}>{p}</span>
      ))}
      <select onChange={e => up({ pathways: [...new Set([...(pathways || []), e.target.value])] })} value="">
        <option value="" disabled>+</option>
        {PATHWAYS.filter(p => !pathways.includes(p)).map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );

  return (
    <div className={`member-card ${status.toLowerCase()} ${editing ? 'edit' : ''}`} onClick={() => setEditing(!editing)}>
      <button className="purge-btn" onClick={e => { e.stopPropagation(); onDelete(id); }}>
        <svg viewBox="0 0 24 24" width="12"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2,0,0,0,8,21H16A2,2,0,0,0,18,19V7H6V19Z" /></svg>
      </button>
      <div className="member-info">
        {editing ? <input autoFocus className="name-in" value={name} onClick={e => e.stopPropagation()} onChange={e => up({ name: e.target.value.toUpperCase() })} /> : <span className="name">{name?.toUpperCase()}</span>}
        <Pths />
      </div>
      <div className="member-stats">
        <div className="stat"><label>LVL</label><Lvl /></div>
        <div className="status-indicator" onClick={e => { e.stopPropagation(); up({ status: status === 'ONLINE' ? 'STDBY' : 'ONLINE' }); }}>{status}</div>
      </div>
    </div>
  );
};
