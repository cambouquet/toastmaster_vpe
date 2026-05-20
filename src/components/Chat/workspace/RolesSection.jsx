import React from 'react';
import { RoleEntry } from './RoleEntry';

export const RolesSection = ({ roles, editing, onEdit, onBlur, onAction }) => {
  const getRoleLabel = (r) => r.charAt(0).toUpperCase() + r.slice(1);
  const isAnyRoleEditing = ['toastmaster', 'timer'].includes(editing);

  return (
    <div className={`card roles ${isAnyRoleEditing ? 'editing' : ''}`}>
      <label>Key Roles</label>
      <div className="role-stack">
        {['toastmaster', 'timer'].map(r => (
          <RoleEntry 
            key={r}
            label={getRoleLabel(r)}
            value={roles[r]}
            isEditing={editing === r}
            onEdit={() => onEdit(r)}
            onBlur={(v) => { onEdit(null); if (v) onAction(`roles.${r}`, v); }}
          />
        ))}
      </div>
    </div>
  );
};
