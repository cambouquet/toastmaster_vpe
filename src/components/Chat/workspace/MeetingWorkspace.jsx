import React, { useState } from 'react';
import { EditableCard } from '../shared/EditableCard';
import { RolesSection } from './RolesSection';
import './Workspace.scss';

export const MeetingWorkspace = ({ state, onAction }) => {
  const [editing, setEditing] = useState(null);

  const handleUpdate = (key, val) => {
    setEditing(null);
    if (val) onAction(key, val);
  };

  return (
    <div className='workspace-screen'>
      <header className="registry-header">
        <h1 className="glitch-text" data-text="NEXT MEETING">NEXT MEETING</h1>
        <div className="stats-bar">ROLE: VPE</div>
      </header>

      <div className='workspace-grid'>
        <EditableCard 
          label='Current Theme' value={state.theme}
          isEditing={editing === 'theme'} onEdit={() => setEditing('theme')}
          onBlur={(val) => handleUpdate('theme', val)}
        />
        <RolesSection 
          roles={state.roles} members={state.members}
          editing={editing} onEdit={setEditing} onAction={onAction} 
        />
        <EditableCard 
          label='Meeting Date' value={state.date}
          isEditing={editing === 'date'} onEdit={() => setEditing('date')}
          onBlur={(val) => handleUpdate('date', val)} placeholder='TBD'
        />
      </div>
    </div>
  );
};