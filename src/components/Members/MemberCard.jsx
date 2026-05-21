import React, { useState } from "react";
import { PATHWAYS } from "../../constants/pathways";
import { PathwayNode } from "./PathwayNode";
import { DeleteButton } from "../shared/DeleteButton";
export const MemberCard = ({ member, onEdit, onDelete, currentUser }) => {
  const { id, name, enrolled = [], status = 'ONLINE', role = 'MEMBER' } = member, [edit, setEdit] = useState(false);
  const isVpe = currentUser?.role === 'VPE';
  const isOwnCard = name === currentUser?.name;

  const up = (u) => onEdit({ id, updates: u });
  const setP = (i, u) => { const n = [...enrolled]; n[i] = { ...n[i], ...u }; up({ enrolled: n }); };
  const addP = (n) => up({ enrolled: [...enrolled, { name: n, level: 1, projects: 0 }] });
  const delP = (i) => up({ enrolled: enrolled.filter((_, idx) => idx !== i) });
  
  const canEdit = isVpe || isOwnCard;

  const cycleRole = (e) => {
    e.stopPropagation();
    if (!isVpe) return;
    const roles = ['GUEST', 'MEMBER', 'VPE'];
    const next = roles[(roles.indexOf(role) + 1) % roles.length];
    up({ role: next });
  };

  return (
    <div className={`member-card ${status.toLowerCase()} ${role.toLowerCase()} ${edit ? "edit" : ""}`} onClick={() => canEdit && setEdit(!edit)}>
      <div className="card-controls">
        <div className={`status-indicator ${status.toLowerCase()}`} onClick={e => { e.stopPropagation(); if (canEdit) up({ status: status === "ONLINE" ? "AWAY" : "ONLINE" }); }}>{status === "STDBY" ? "AWAY" : status}</div>
        <div className={`role-tag ${role.toLowerCase()}`} onClick={cycleRole}>{role}</div>
        {isVpe && <DeleteButton onDelete={() => onDelete(id)} className="purge-btn" />}
      </div>
      <div className="member-info">
        {edit ? (
          <input 
            autoFocus 
            className="name-in" 
            value={name} 
            onClick={e => e.stopPropagation()} 
            onKeyDown={e => e.key === 'Enter' && setEdit(false)}
            onBlur={() => setEdit(false)}
            onChange={e => up({ name: e.target.value.toUpperCase() })} 
          />
        ) : (
          <span className="name">{name?.toUpperCase()}</span>
        )}
        <div className="enrolled-list" onClick={e => e.stopPropagation()}>
          {enrolled.map((p, i) => <PathwayNode key={p.name} item={p} onUpdate={(u) => setP(i, u)} onRemove={() => delP(i)} />)}
          <PathwayNode isNew available={PATHWAYS.filter(p => !enrolled.find(e => e.name === p))} onUpdate={addP} />
        </div>
      </div>
    </div>
  );
};
