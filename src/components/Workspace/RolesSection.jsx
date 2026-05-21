import React from 'react';
import { RoleEntry } from './RoleEntry';

export const RolesSection = ({ roles, members, editing, onEdit, onAction, currentUser }) => {
  const getRoleLabel = (r) => {
    const labels = {
      toastmaster: 'Toastmaster', genEvaluator: 'General Evaluator',
      topicsMaster: 'Table Topics Master', timer: 'Timer',
      grammarian: 'Grammarian', ahCounter: 'Ah-Counter'
    };
    return labels[r] || r;
  };

  const roleKeys = ['toastmaster', 'genEvaluator', 'topicsMaster', 'timer', 'grammarian', 'ahCounter'];
  const isAnyRoleEditing = roleKeys.includes(editing);

  return (
    <div className={`card roles ${isAnyRoleEditing ? 'editing' : ''}`}>
      <label>Meeting Roles</label>
      <div className="role-stack">
        {roleKeys.map(r => {
          const isVpe = currentUser?.role === 'VPE';
          const isOwnRole = roles[r] === currentUser?.name;
          const canEdit = isVpe || (!roles[r] || roles[r] === 'Open' || isOwnRole);

          return (
            <RoleEntry 
              key={r}
              label={getRoleLabel(r)}
              value={roles[r]}
              members={isVpe ? members : members.filter(m => m.name === currentUser?.name)}
              isEditing={editing === r}
              onEdit={() => canEdit && onEdit(r)}
              onBlur={(v) => { 
                if (!canEdit && v !== roles[r]) return;
                onEdit(null); 
                if (v !== undefined) onAction(`roles.${r}`, v); 
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
