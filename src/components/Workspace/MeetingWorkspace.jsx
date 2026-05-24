import React, { useState } from 'react';
import { RolesSection } from './RolesSection';
import { SpeakersSection } from './SpeakersSection';
import { BriefingSection } from './BriefingSection';
import { ActionSection } from './ActionSection';
import { MeetingSchedule } from './MeetingSchedule';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import './Workspace.scss';

export const MeetingWorkspace = ({ state, onAction }) => {
  const [editing, setEditing] = useState(null);
  const isVpe = state.currentUser?.role === 'VPE' || state.currentUser?.role === 'ADMIN';

  const handleUpdate = (key, val) => {
    setEditing(null);
    if (isVpe && val !== undefined) onAction(key, val);
  };
  const common = { state, editing, onEdit: (k) => isVpe && setEditing(k), onUpdate: handleUpdate };

  return (
    <div className='workspace-screen'>
      <AppHeader title="NEXT MEETING" />
      <div className='workspace-grid'>
        <MeetingSchedule {...common} />
        <EditableCard label='Meeting Theme' value={state.theme} isEditing={editing === 'theme'}
          onEdit={() => isVpe && setEditing('theme')} onBlur={(v) => handleUpdate('theme', v)} />
        <BriefingSection {...common} />
        <ActionSection state={state} />
        <RolesSection roles={state.roles} members={state.members} editing={editing} 
          onEdit={setEditing} onAction={onAction} currentUser={state.currentUser} />
        <SpeakersSection speakers={state.roles.speakers} members={state.members} editing={editing} 
          onEdit={setEditing} onAction={onAction} currentUser={state.currentUser} />
      </div>
    </div>
  );
};