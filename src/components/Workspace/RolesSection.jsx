import React from 'react';
import { RoleEntry } from './RoleEntry';

export const RolesSection = ({ roles, members, editing, onEdit, onAction }) => {
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
        {roleKeys.map(r => (
          <RoleEntry 
            key={r}
            label={getRoleLabel(r)}
            value={roles[r]}
            members={members}
            isEditing={editing === r}
            onEdit={() => onEdit(r)}
            onBlur={(v) => { onEdit(null); if (v !== undefined) onAction(`roles.${r}`, v); }}
          />
        ))}
      </div>
    </div>
  );
};
