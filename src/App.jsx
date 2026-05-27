import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import { SplashScreen } from './components/Shell/SplashScreen';
import { SyncOverlay } from './components/Shell/SyncOverlay';
import { initKeycloak, isConnectionDegraded } from './services/auth/KeycloakService';
import './App.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    initKeycloak(() => {
      setAuthReady(true);
    });
  }, []);

  const handleFinish = () => {
    setLoading(false);
  };

  return (
    <div className={`App ${isConnectionDegraded() ? 'mode-degraded' : ''}`}>
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        {!authReady || loading ? (
          <SplashScreen onFinish={handleFinish} />
        ) : (
          <Shell />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
