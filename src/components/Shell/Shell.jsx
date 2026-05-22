import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { Subtitles } from '../Agent/messaging/Subtitles';
import { ChatInput } from '../Agent/input/ChatInput';
import { DebugPanel } from '../shared/DebugPanel';
import { SystemStatus } from './SystemStatus';
import { SystemNotification } from '../shared/SystemNotification';
import { HealthService } from '../../services/system/HealthService';
import './Shell.scss';

const aiService = new MockAiService();

export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs, notify, notifications, dismiss } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const isWorkspace = state.currentScreen === 'workspace';

  const onAuth = () => (state.currentUser.role === 'NONE' || state.currentUser.name === 'Guest' ? uiAction('login') : uiAction('logout'));

  const onToggleDebug = () => {
    const next = !showDebug;
    uiAction('TOGGLE_DEBUG', next);
    setShowDebug(next);
  };

  return (
    <div className="app-shell">
      <SystemStatus user={state.currentUser} screen={state.currentScreen} nodeCount={isWorkspace ? 11 : state.members.length} onAuth={onAuth} />
      
      {isWorkspace ? <MeetingWorkspace state={state} onAction={uiAction} /> : <MemberRegistry members={state.members} onAction={uiAction} currentUser={state.currentUser} />}

      <SystemNotification notifications={notifications} onDismiss={dismiss} />
      <Subtitles text={subtitle} />

      <div className="bottom-input-wrap">
        <ChatInput onSend={(txt) => interact(txt)} onType={(txt) => interact(txt, true)} onToggleDebug={onToggleDebug} testStatus={state.testStatus} ackCount={state.ackCount} />
      </div>

      {showDebug && <DebugPanel 
        logs={logs} 
        state={state} 
        onClose={onToggleDebug} 
        onClear={() => { uiAction('CLEAR_LOGS'); clearLogs(); }} 
        onHealth={() => { uiAction('RUN_DIAG'); return HealthService.check(state, logs); }} 
        onDump={() => uiAction('DUMP_LOGS')}
      />}
    </div>
  );
};
