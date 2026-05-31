import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { IdentityLab } from './IdentityLab';
import { KFontValidator } from './KFontValidator';
import { FontLab } from './FontLab';
import { AppLauncher } from './AppLauncher';
import { BodyModelPlayground } from './BodyModel/BodyModelPlayground';
import { getAppInfo } from '../../services/system/AppRegistry.jsx';

const ModulePlaceholder = ({ name, id }) => (
  <div className="module-boot-sequence">
    <div className="glitch-text" data-text={`INITIALIZING ${name}...`}>INITIALIZING {name}...</div>
    <div className="uplink-progress"><div className="scanline" /></div>
    <p className="sm-info">Uplink established with {id.toUpperCase()} node.</p>
    <p className="sm-info muted">Module logic loading from cloud-edge...</p>
  </div>
);

export const MainContent = ({ isWorkspace, state, uiAction, onAuth }) => {
  const { currentApp } = state;
  const appInfo = getAppInfo(currentApp);
  
  if (currentApp === 'launcher') {
    return <AppLauncher user={state.currentUser} currentApp={currentApp} onSwitch={(appId) => uiAction('SWITCH_APP', appId)} />;
  }

  if (currentApp === 'guide' || currentApp === 'zenith') {
    return (
      <div className="guide-iframe-wrap" style={{ width: '100%', height: 'calc(100vh - 80px)', background: 'transparent' }}>
        <iframe src="/briefing/" title="K Guide" style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} />
      </div>
    );
  }

  if (currentApp === 'identity' || currentApp === 'identity-lab' || currentApp === 'k-app') {
    return <IdentityLab state={state} uiAction={uiAction} onAuth={onAuth} />;
  }

  if (currentApp === 'workspace') {
    return <MeetingWorkspace state={state} onAction={uiAction} />;
  }

  if (currentApp === 'health') {
    return <BodyModelPlayground />;
  }

  return <ModulePlaceholder name={appInfo.name} id={appInfo.char} />;
};
