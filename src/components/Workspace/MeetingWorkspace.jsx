import React, { useState } from 'react';
import { RolesSection } from './RolesSection';
import { SpeakersSection } from './SpeakersSection';
import { BriefingSection } from './BriefingSection';
import { ActionSection } from './ActionSection';
import { MeetingSchedule } from './MeetingSchedule';
import { EditableCard } from '../shared/EditableCard';
import './Workspace.scss';

export const MeetingWorkspace = ({ state, onAction }) => {
  const [editing, setEditing] = useState(null);
  const handleUpdate = (key, val) => {
    setEditing(null);
    if (val !== undefined) onAction(key, val);
  };
  const common = { state, editing, onEdit: setEditing, onUpdate: handleUpdate };

  return (
    <div className='workspace-screen'>
      <header className="registry-header">
        <h1 className="glitch-text" data-text="NEXT MEETING">NEXT MEETING</h1>
      </header>
      <div className='workspace-grid'>
        <MeetingSchedule {...common} />
        <EditableCard 
          label='Meeting Theme' value={state.theme}
          isEditing={editing === 'theme'} onEdit={() => setEditing('theme')}
          onBlur={(val) => handleUpdate('theme', val)}
        />
        <BriefingSection {...common} />
        <ActionSection state={state} />
        <RolesSection 
          roles={state.roles} members={state.members}
          editing={editing} onEdit={setEditing} onAction={onAction} 
        />
        <SpeakersSection 
          speakers={state.roles.speakers} members={state.members}
          editing={editing} onEdit={setEditing} onAction={onAction} 
        />
      </div>
    </div>
  );
};