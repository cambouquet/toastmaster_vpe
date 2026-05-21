import React, { useState } from 'react';
import { RolesSection } from './RolesSection';
import { SpeakersSection } from './SpeakersSection';
import { BriefingSection } from './BriefingSection';
import { MeetingSchedule } from './MeetingSchedule';
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
        <div className="stats-bar">ROLE: VPE &nbsp;|&nbsp; STATUS: OPTIMAL</div>
      </header>

      <div className='workspace-grid'>
        <BriefingSection {...common} />
        <MeetingSchedule {...common} />
        <RolesSection 
          roles={state.roles} members={state.members}
          editing={editing} onEdit={setEditing} onAction={onAction} 
        />
        <SpeakersSection 
          speakers={state.roles.speakers} onAction={onAction} 
        />
      </div>
    </div>
  );
};