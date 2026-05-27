import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useAuthSync } from '../../hooks/useAuthSync';
import { MockAiService } from '../../services/ai/MockAiService';
import { ShellLayout } from './ShellLayout';
import './Shell.scss';

const aiService = new MockAiService();

export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs, notify, notifications, dismiss } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { syncProgress, syncType, onAuth } = useAuthSync(uiAction, notify);

  return (
    <ShellLayout 
      state={state}
      props={{ syncProgress, syncType, notifications, subtitle, logs }}
      handlers={{ 
        uiAction, onAuth, interact, dismiss, clearLogs,
        toggleNav: () => uiAction('SWITCH_APP', 'launcher'),
        toggleDebug: () => setShowDebug(!showDebug)
      }}
      flags={{ showNav: false, showDebug }}
    />
  );
};
