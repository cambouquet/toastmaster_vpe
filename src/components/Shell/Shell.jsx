import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { Subtitles } from '../Agent/messaging/Subtitles';
import { ChatInput } from '../Agent/input/ChatInput';
import { DebugPanel } from '../shared/DebugPanel';
import { HealthService } from '../../services/system/HealthService';
import './Shell.scss';

const aiService = new MockAiService();

export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const isWorkspace = state.currentScreen === 'workspace';

  const runHealthCheck = () => {
    uiAction('RUN_TESTS');
    return HealthService.check(state, logs);
  };

  return (
    <div className="app-shell">
      <div className="system-status-readout">
        ID: {state.currentUser.name} ({state.currentUser.role}) &nbsp;|&nbsp; 
        STATUS: OPERATIONAL &nbsp;|&nbsp; NODE: {state.currentScreen.toUpperCase()} &nbsp;|&nbsp; NODES: {isWorkspace ? 11 : state.members.length}
        <button className="auth-btn" onClick={() => (state.currentUser.role === 'NONE' || state.currentUser.name === 'Guest' ? aiService.login() : aiService.logout())}>
          {state.currentUser.role === 'NONE' || state.currentUser.name === 'Guest' ? 'AUTH_UPLINK' : 'DISCONNECT'}
        </button>
      </div>
      
      {isWorkspace ? (
        <MeetingWorkspace state={state} onAction={uiAction} />
      ) : (
        <MemberRegistry members={state.members} onAction={uiAction} currentUser={state.currentUser} />
      )}

      {subtitle && subtitle !== 'Standby.' && <Subtitles text={subtitle} />}

      <div className="bottom-input-wrap">
        <ChatInput 
          onSend={(txt) => interact(txt)} 
          onType={(txt) => interact(txt, true)}
          onToggleDebug={() => setShowDebug(!showDebug)} 
          testStatus={state.testStatus}
          ackCount={state.ackCount}
        />
      </div>

      {showDebug && (
        <DebugPanel 
          logs={logs} 
          state={state} 
          onClose={() => setShowDebug(false)} 
          onClear={clearLogs}
          onHealth={runHealthCheck}
        />
      )}
    </div>
  );
};
