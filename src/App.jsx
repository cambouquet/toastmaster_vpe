import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import { SplashScreen } from './components/Shell/SplashScreen';
import { SyncOverlay } from './components/Shell/SyncOverlay';
import { Waitlist } from './components/Shell/Waitlist';
import { initKeycloak, isConnectionDegraded, isAuthenticated } from './services/auth/KeycloakService';
import './App.scss';

const APP_MODE = import.meta.env.VITE_APP_MODE;

function App() {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (APP_MODE === 'demo') {
      setLoading(false);
      return;
    }
    initKeycloak(() => {
      setAuthReady(true);
      if (isAuthenticated()) setLoading(false);
    });
  }, []);

  const handleFinish = React.useCallback(() => {
    setLoading(false);
  }, []);

  if (APP_MODE === 'demo') {
    return (
      <div className="App mode-demo">
        <ErrorBoundary>
          <Waitlist />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className={`App ${isConnectionDegraded() ? 'mode-degraded' : ''}`}>
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        {!authReady || loading ? (
          <SplashScreen onFinish={handleFinish} isLoggingIn={isAuthenticated()} />
        ) : (
          <Shell />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
