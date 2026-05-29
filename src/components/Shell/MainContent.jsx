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
  
  const placeholders = ['academy', 'nexus', 'health-lab', 'sanctuary', 'soul-link'];
  if (placeholders.includes(currentApp)) {
    return <ModulePlaceholder name={currentApp.toUpperCase().replace('-', ' ')} />;
  }

  if (currentApp === 'arcade') {
    return <ModulePlaceholder name="GAMES ARCADE" />;
  }

  if (currentApp === 'launcher') {
    return <AppLauncher user={state.currentUser} currentApp={currentApp} onSwitch={(appId) => uiAction('SWITCH_APP', appId)} />;
  }

  if (currentApp === 'guide') {
    return (
      <div className="guide-iframe-wrap" style={{ width: '100%', height: 'calc(100vh - 80px)', background: 'transparent' }}>
        <iframe 
          src="/briefing/" 
          title="K Guide" 
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
        />
      </div>
    );
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
