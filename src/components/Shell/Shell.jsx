import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { MockAiService } from '../../services/ai/MockAiService';
import { ChatInput } from '../Agent/input/ChatInput';
import { DebugPanel } from '../shared/DebugPanel';
import { SystemStatus } from './SystemStatus';
import { SystemNotification } from '../shared/SystemNotification';
import { Subtitles } from '../Agent/messaging/Subtitles';
import { MainContent } from './MainContent';
import { HealthService } from '../../services/system/HealthService';
import './Shell.scss';
const aiService = new MockAiService();
export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs, notifications, dismiss } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const [trans, setTrans] = useState(false);
  const onAuth = (role, extra) => {
    setTrans(true); setTimeout(() => setTrans(false), 800);
    if (role === 'logout') return uiAction('logout');
    uiAction('login', role === 'addMember' ? extra.id : role);
  };
  return (
    <div className={`app-shell ${trans ? 'is-transitioning' : ''}`}>
      <div className="system-glitch-overlay" />
      <SystemStatus user={state.currentUser} onAuth={onAuth} />
      <MainContent isWorkspace={state.currentScreen === 'workspace'} state={state} uiAction={uiAction} />
      <SystemNotification notifications={notifications} onDismiss={dismiss} />
      <Subtitles text={subtitle} />
      <div className="bottom-input-wrap">
        <ChatInput onSend={(t) => interact(t)} onType={(t) => interact(t, true)} 
          onToggleDebug={() => setShowDebug(!showDebug)} testStatus={state.testStatus} />
      </div>
      {showDebug && <DebugPanel logs={logs} state={state} onClose={() => setShowDebug(false)} 
        onClear={() => { uiAction('CLEAR_LOGS'); clearLogs(); }} 
        onHealth={() => HealthService.check(state, logs)} />}
    </div>
  );
};
