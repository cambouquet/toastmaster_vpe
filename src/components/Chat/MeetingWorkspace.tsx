import React, { useState } from 'react';
import { MeetingState } from '../../models/Collaboration';
import { EditableCard } from './EditableCard';
import { RoleEntry } from './RoleEntry';
import './Workspace.scss';

interface Props { 
  state: MeetingState; 
  onAction: (type: string, val: any) => void; 
}

export const MeetingWorkspace: React.FC<Props> = ({ state, onAction }) => {
  const [editing, setEditing] = useState<string | null>(null);

  const getRoleLabel = (r: string) => r.charAt(0).toUpperCase() + r.slice(1);

  return (
    <div className="workspace-grid" style={{ paddingTop: '4rem' }}>
      <EditableCard 
        label="Current Theme" 
        value={state.theme}
        isEditing={editing === 'theme'}
        onEdit={() => setEditing('theme')}
        onBlur={(val) => { setEditing(null); if (val) onAction('theme', val); }}
      />
      <div className="card roles">
        <label>Key Roles</label>
        <div className="role-stack">
          {['toastmaster', 'timer'].map(r => (
            <RoleEntry 
              key={r}
              label={getRoleLabel(r)}
              value={(state.roles as any)[r]}
              isEditing={editing === r}
              onEdit={() => setEditing(r)}
              onBlur={(v) => { setEditing(null); if (v) onAction(`roles.${r}`, v); }}
            />
          ))}
        </div>
      </div>
      <EditableCard 
        label="Meeting Date" 
        value={state.date}
        isEditing={editing === 'date'}
        onEdit={() => setEditing('date')}
        onBlur={(val) => { setEditing(null); if (val) onAction('date', val); }}
        placeholder="TBD"
      />
    </div>
  );
};
