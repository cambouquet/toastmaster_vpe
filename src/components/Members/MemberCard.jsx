import React, { useState } from "react";
import { MemberPathways } from "./MemberPathways";
import { MemberCardHeader } from "./MemberCardHeader";

export const MemberCard = ({ member, onEdit, onDelete, currentUser }) => {
  const { id, name, enrolled = [], status = 'ONLINE', role = 'MEMBER', title = 'MEMBER' } = member;
  const [edit, setEdit] = useState(false);
  const isVpe = currentUser?.role === 'VPE' || currentUser?.role === 'ADMIN';
  const canEdit = isVpe || name === currentUser?.name;
  const up = (u) => onEdit({ id, updates: u });

  const cycleRole = (e) => {
    e.stopPropagation();
    if (!isVpe) return;
    const t = ['MEMBER', 'PRESIDENT', 'VP EDUCATION', 'VP MEMBERSHIP', 'VP PUBLIC RELATIONS', 'SECRETARY', 'TREASURER', 'SERGEANT AT ARMS'];
    const next = t[(t.indexOf(title) + 1) % t.length];
    up({ title: next, role: next === 'VP EDUCATION' ? 'VPE' : 'MEMBER' });
  };

  return (
    <div className={`member-card ${status.toLowerCase()} ${role.toLowerCase()} ${edit ? "edit" : ""} ${canEdit ? "clickable" : ""}`} onClick={() => canEdit && setEdit(!edit)}>
      <MemberCardHeader status={status} title={title} role={role} canEdit={canEdit} isVpe={isVpe} up={up} cycleRole={cycleRole} onDelete={onDelete} id={id} />
      <div className="member-main-content">
        <div className="member-info">
          {edit ? <input autoFocus className="name-in" value={name} onClick={e => e.stopPropagation()} onKeyDown={e => e.key === 'Enter' && setEdit(false)}
              onBlur={() => setEdit(false)} onChange={e => up({ name: e.target.value.toUpperCase() })} />
            : <span className="name">{name?.toUpperCase()}</span>}
          <MemberPathways enrolled={enrolled} setP={(i, u) => { const n = [...enrolled]; n[i] = { ...n[i], ...u }; up({ enrolled: n }); }}
            addP={(n) => up({ enrolled: [...enrolled, { name: n, level: 1, projects: 0 }] })} delP={(i) => up({ enrolled: enrolled.filter((_, idx) => idx !== i) })} />
        </div>
        <div className="profile-photo-slot"><div className="avatar-frame"><div className="glitch-overlay" /><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} /></div></div>
      </div>
    </div>
  );
};
