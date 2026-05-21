import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { MeetingWorkspace } from './workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { Subtitles } from './messaging/Subtitles';
import { ChatInput } from './input/ChatInput';
import { DebugPanel } from '../shared/DebugPanel';
import { HealthService } from '../../services/system/HealthService';

const aiService = new MockAiService();

export const ChatContainer = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const isWorkspace = state.currentScreen === 'workspace';

  const runHealthCheck = () => {
    uiAction('RUN_TESTS');
    return HealthService.check(state, logs);
  };

  return (
    <div className="chat-container">
      {isWorkspace ? (
        <MeetingWorkspace state={state} onAction={uiAction} />
      ) : (
        <MemberRegistry members={state.members} onAction={uiAction} />
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
