import React from 'react';
import { RoleEntry } from './RoleEntry';

export const RolesSection = ({ roles, members, editing, onEdit, onAction, currentUser }) => {
  const getLabel = (r) => ({
    tm: 'Toastmaster', ge: 'Gen Evaluator', tt: 'Topics Master', t: 'Timer', g: 'Grammarian', ah: 'Ah-Counter'
  }[r] || r);
  const keys = ['toastmaster', 'genEvaluator', 'topicsMaster', 'timer', 'grammarian', 'ahCounter'];

  return (
    <div className={`card roles ${keys.includes(editing) ? 'editing' : ''}`}>
      <label>Meeting Roles</label>
      <div className="role-stack">{keys.map(r => {
          const isVpe = currentUser?.role === 'VPE' || currentUser?.role === 'ADMIN', isOwn = roles[r] === currentUser?.name;
          const canEdit = isVpe || (currentUser?.role === 'MEMBER' && (!roles[r] || roles[r] === 'Open' || isOwn));
          return (
            <RoleEntry key={r} label={getLabel(r)} value={roles[r]}
              members={isVpe ? members : (currentUser?.role === 'MEMBER' ? members.filter(m => m.name === currentUser?.name) : [])}
              isEditing={editing === r} onEdit={() => canEdit && onEdit(r)}
              onBlur={(v) => { if (canEdit || v === roles[r]) { onEdit(null); if (v !== undefined) onAction(`roles.${r}`, v); } }} />
          );
        })}</div>
    </div>
  );
};
