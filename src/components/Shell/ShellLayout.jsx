import React from 'react';
import { SyncOverlay } from './SyncOverlay';
import { AppLoadingScreen } from './AppLoadingScreen';
import { NavigationOverlay } from './NavigationOverlay';
import { SystemStatus } from './SystemStatus';
import { MainContent } from './MainContent';
import { SystemNotification } from '../shared/SystemNotification';
import { Subtitles } from '../Agent/messaging/Subtitles';
import { ChatInput } from '../Agent/input/ChatInput';
import { DebugPanel } from '../shared/DebugPanel';
import { HealthService } from '../../services/system/HealthService';
import { Logo } from './Logo';

export const ShellLayout = ({ state, props, handlers, flags }) => (
  <div className={`app-shell ${props.syncProgress > 0 ? 'is-transitioning' : ''}`}>
    <div className="system-glitch-overlay" />
    {props.syncProgress > 0 && <SyncOverlay progress={props.syncProgress} type={props.syncType} />}
    {state.switchingTo && <AppLoadingScreen app={state.switchingTo} />}
    {flags.showNav && (
      <NavigationOverlay currentApp={state.currentApp} onClose={handlers.toggleNav}
        onSwitch={(app) => handlers.uiAction('SWITCH_APP', app)} />
    )}
    {/* <SystemStatus user={state.currentUser} currentApp={state.currentApp}
      onAuth={handlers.onAuth} onToggleNav={handlers.toggleNav} /> */}
    <MainContent 
      isWorkspace={state.currentScreen === 'workspace'} 
      state={state} 
      uiAction={handlers.uiAction} 
      onAuth={handlers.onAuth}
    />
    <SystemNotification notifications={props.notifications} onDismiss={handlers.dismiss} />
    <Subtitles text={props.subtitle} />
    <div className="bottom-input-wrap">
      <ChatInput onSend={handlers.interact} onType={(t) => handlers.interact(t, true)} 
        onToggleDebug={handlers.toggleDebug} testStatus={state.testStatus} />
    </div>
    {flags.showDebug && <DebugPanel logs={props.logs} state={state} onClose={handlers.toggleDebug} 
      onClear={() => { handlers.uiAction('CLEAR_LOGS'); handlers.clearLogs(); }} 
      onHealth={() => HealthService.check(state, props.logs)} />}
  </div>
);