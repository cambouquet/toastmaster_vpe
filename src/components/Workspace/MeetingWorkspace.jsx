import React, { useState, useEffect } from 'react';
import { RolesSection } from './RolesSection';
import { SpeakersSection } from './SpeakersSection';
import { BriefingSection } from './BriefingSection';
import { ActionSection } from './ActionSection';
import { MeetingSchedule } from './MeetingSchedule';
import { MeetingProgram } from './MeetingProgram';
import { MapPreview } from './MapPreview';
import { LiveToolkit } from './LiveToolkit';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import './Workspace.scss';

export const MeetingWorkspace = ({ state, onAction }) => {
  const [editing, setEditing] = useState(null);
  const isVpe = state.currentUser?.role === 'VPE' || state.currentUser?.role === 'ADMIN';

  useEffect(() => { 
    if (state.status === 'live') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.status]);

  const handleUpdate = (key, val) => {
    setEditing(null);
    if (isVpe && val !== undefined) onAction(key, val);
  };
  const common = { state, editing, onEdit: isVpe ? setEditing : null, onUpdate: handleUpdate };

  return (
    <div className='workspace-screen'>
      <AppHeader title={state.status === 'live' ? "LIVE SESSION" : "NEXT MEETING"} status={state.status} />
      <div className='workspace-grid'>
        {state.status === 'live' && <LiveToolkit state={state} onAction={onAction} />}
        <MeetingProgram state={state} onAction={onAction} />
        <MeetingSchedule {...common} />
        <MapPreview url={state.mapUrl} />
        <EditableCard label='Theme' value={state.theme} isEditing={editing === 'theme'}
          onEdit={isVpe ? () => setEditing('theme') : null} onBlur={(v) => handleUpdate('theme', v)} />
        <BriefingSection {...common} /> <ActionSection state={state} onAction={onAction} />
        <RolesSection roles={state.roles} members={state.members} editing={editing}
          onEdit={setEditing} onAction={onAction} currentUser={state.currentUser} />
        <SpeakersSection speakers={state.roles.speakers || []} members={state.members} 
          editing={editing} onEdit={setEditing} onAction={onAction} currentUser={state.currentUser} />
      </div>
    </div>
  );
};

