import React, { useState } from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';
import { useAuthSync } from '../../hooks/useAuthSync';
import { MockAiService } from '../../services/ai/MockAiService';
import { ShellLayout } from './ShellLayout';
import './Shell.scss';

const aiService = new MockAiService();

export const Shell = () => {
  const { state, subtitle, interact, uiAction, logs, clearLogs, notifications, dismiss } = useCollaboration(aiService);
  const [showDebug, setShowDebug] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { syncProgress, onAuth } = useAuthSync(uiAction);

  return (
    <ShellLayout 
      state={state}
      props={{ syncProgress, notifications, subtitle, logs }}
      handlers={{ 
        uiAction, onAuth, interact, dismiss, clearLogs,
        toggleNav: () => setShowNav(!showNav),
        toggleDebug: () => setShowDebug(!showDebug)
      }}
      flags={{ showNav, showDebug }}
    />
  );
};
