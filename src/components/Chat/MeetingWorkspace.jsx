import React, { useState } from 'react';
import { EditableCard } from './EditableCard';
import { RolesSection } from './RolesSection';
import './Workspace.scss';

export const MeetingWorkspace = ({ state, onAction }) => {
  const [editing, setEditing] = useState(null);

  const handleUpdate = (key, val) => {
    setEditing(null);
    if (val) onAction(key, val);
  };

  return (
    <div className='workspace-grid' style={{ paddingTop: '4rem' }}>
      <EditableCard 
        label='Current Theme' 
        value={state.theme}
        isEditing={editing === 'theme'}
        onEdit={() => setEditing('theme')}
        onBlur={(val) => handleUpdate('theme', val)}
      />
      <RolesSection 
        roles={state.roles} 
        editing={editing} 
        onEdit={setEditing} 
        onAction={onAction} 
      />
      <EditableCard 
        label='Meeting Date' 
        value={state.date}
        isEditing={editing === 'date'}
        onEdit={() => setEditing('date')}
        onBlur={(val) => handleUpdate('date', val)}
        placeholder='TBD'
      />
    </div>
  );
};