import React from 'react';
import { RoleEntry } from './RoleEntry';

export const RolesSection = ({ roles, members, editing, onEdit, onAction, currentUser }) => {
  const getLabel = (r) => ({
    host: 'Host', observer: 'Observer', speaker: 'Speaker', timer: 'Timekeeper', scribe: 'Scribe', reviewer: 'Reviewer'
  }[r] || r);
  const keys = ['host', 'observer', 'speaker', 'timer', 'scribe', 'reviewer'];

  return (
    <div className={`card roles ${keys.includes(editing) ? 'editing' : ''}`}>
      <label>Meeting Roles</label>
      <div className="role-stack">{keys.map(r => {
          const isOrganizer = currentUser?.role === 'ORGANIZER' || currentUser?.role === 'ADMIN', isOwn = roles[r] === currentUser?.name;
          const canEdit = isOrganizer || (currentUser?.role === 'PARTICIPANT' && (!roles[r] || roles[r] === 'Open' || isOwn));
          return (
            <RoleEntry key={r} label={getLabel(r)} value={roles[r]}
              members={isOrganizer ? members : (currentUser?.role === 'PARTICIPANT' ? members.filter(m => m.name === currentUser?.name) : [])}
              isEditing={editing === r} onEdit={canEdit ? () => onEdit(r) : null}
              onBlur={(v) => { if (canEdit || v === roles[r]) { onEdit(null); if (v !== undefined) onAction(`roles.${r}`, v); } }} />
          );
        })}</div>
    </div>
  );
};
