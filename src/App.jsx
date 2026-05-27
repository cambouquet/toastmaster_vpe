import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import { SplashScreen } from './components/Shell/SplashScreen';
import { SyncOverlay } from './components/Shell/SyncOverlay';
import { SystemNotification } from './components/shared/SystemNotification';
import { initKeycloak, isConnectionDegraded } from './services/auth/KeycloakService';
import { useNotifications } from './hooks/useNotifications';
import './App.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const { notifications, notify, dismiss } = useNotifications();
  const notifiedRef = React.useRef(false);

  useEffect(() => {
    initKeycloak(() => {
      setAuthReady(true);
      if (isConnectionDegraded() && !notifiedRef.current) {
        notifiedRef.current = true;
        notify("CONNECTION FAILED - RUNNING IN OFFLINE MODE", "error");
      }
    });
  }, [notify]);

  const handleFinish = () => {
    setLoading(false);
  };

  return (
    <div className={`App ${isConnectionDegraded() ? 'mode-degraded' : ''}`}>
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        <SystemNotification notifications={notifications} onDismiss={dismiss} />
        {loading ? (
          <SplashScreen onFinish={handleFinish} />
        ) : !authReady ? (
          <SyncOverlay 
            progress={99} 
            type="in" 
            title="ESTABLISHING NEURAL LINK" 
            failed={isConnectionDegraded()} 
          />
        ) : (
          <Shell />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
