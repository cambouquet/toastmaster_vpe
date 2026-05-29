import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { IdentityLab } from './IdentityLab';
import { KFontValidator } from './KFontValidator';
import { FontLab } from './FontLab';
import { AppLauncher } from './AppLauncher';

const ModulePlaceholder = ({ name }) => (
  <div className="module-boot-sequence">
    <div className="glitch-text" data-text={`INITIALIZING ${name}...`}>INITIALIZING {name}...</div>
    <div className="neural-progress"><div className="scanline" /></div>
    <p className="sm-info">Cross-platform neural link established. Module logic loading...</p>
  </div>
);

export const MainContent = ({ isWorkspace, state, uiAction, onAuth }) => {
  const { currentApp } = state;
  
  const placeholders = ['nexus', 'academy', 'arcade', 'soul-link', 'sanctuary', 'kids-verse'];
  if (placeholders.includes(currentApp)) {
    return <ModulePlaceholder name={currentApp.toUpperCase().replace('-', ' ')} />;
  }

  if (currentApp === 'launcher') {
    return <AppLauncher user={state.currentUser} currentApp={currentApp} onSwitch={(appId) => uiAction('SWITCH_APP', appId)} />;
  }

  if (currentApp === 'identity-lab' || currentApp === 'k-app') {
    return <IdentityLab state={state} uiAction={uiAction} onAuth={onAuth} />;
  }

  if (isWorkspace) {
    return <MeetingWorkspace state={state} onAction={uiAction} />;
  }

  return (
    <MemberRegistry members={state.members} onAction={uiAction} currentUser={state.currentUser} />
  );
};
