import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { IdentityLab } from './IdentityLab';

export const MainContent = ({ isWorkspace, state, uiAction, onAuth }) => {
  if (state.currentApp === 'identity-lab' || state.currentApp === 'mission-control') {
    return <IdentityLab state={state} uiAction={uiAction} onAuth={onAuth} />;
  }

  if (isWorkspace) {
    return <MeetingWorkspace state={state} onAction={uiAction} />;
  }

  return (
    <MemberRegistry 
      members={state.members} 
      onAction={uiAction} 
      currentUser={state.currentUser} 
    />
  );
};
