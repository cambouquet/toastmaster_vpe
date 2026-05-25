import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { IdentityLab } from './IdentityLab';
import { KFontValidator } from './KFontValidator';
import { FontLab } from './FontLab';

export const MainContent = ({ isWorkspace, state, uiAction, onAuth }) => {
  if (state.currentApp === 'identity-lab' || state.currentApp === 'mission-control') {
    return <IdentityLab state={state} uiAction={uiAction} onAuth={onAuth} />;
  }

  if (state.currentApp === 'font-lab') {
    return <FontLab user={state.currentUser} />;
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
