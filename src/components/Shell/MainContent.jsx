import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { IdentityLab } from './IdentityLab';
import { KFontValidator } from './KFontValidator';
import { FontLab } from './FontLab';
import { AppLauncher } from './AppLauncher';

export const MainContent = ({ isWorkspace, state, uiAction, onAuth }) => {
  if (state.currentApp === 'launcher') {
    return <AppLauncher currentApp={state.currentApp} onSwitch={(appId) => uiAction('SWITCH_APP', appId)} />;
  }

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
