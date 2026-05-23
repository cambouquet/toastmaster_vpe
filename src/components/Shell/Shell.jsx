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
import { SyncOverlay } from './SyncOverlay';
const aiService = new MockAiService();
export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs, notifications, dismiss } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const onAuth = (role, extra) => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        clearInterval(interval);
        setSyncProgress(0);
        if (role === 'logout') return uiAction('logout');
        uiAction('login', role === 'addMember' ? extra.id : role);
      } else {
        setSyncProgress(current);
      }
    }, 120);
  };
  return (
    <div className={`app-shell ${syncProgress > 0 ? 'is-transitioning' : ''}`}>
      <div className="system-glitch-overlay" />
      {syncProgress > 0 && <SyncOverlay progress={syncProgress} />}
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
