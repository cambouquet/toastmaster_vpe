import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { AppContent } from './components/App/AppContent';
import { initKeycloak, isConnectionDegraded, isAuthenticated } from './services/auth/KeycloakService';
import './App.scss';

const APP_MODE = import.meta.env.VITE_APP_MODE;

import { Waitlist } from './components/Shell/Waitlist';

const DemoWrapper = () => (
  <div className="App mode-demo">
    <ErrorBoundary>
      <Waitlist />
    </ErrorBoundary>
  </div>
);

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

  const handleFinish = React.useCallback(() => setLoading(false), []);

  if (APP_MODE === 'demo') return <DemoWrapper />;

  return (
    <div className={`App ${isConnectionDegraded() ? 'mode-degraded' : ''}`}>
      <div className="glitch-scanline" />
      <ErrorBoundary>
        <AppContent 
          authReady={authReady} 
          loading={loading} 
          handleFinish={handleFinish} 
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;

