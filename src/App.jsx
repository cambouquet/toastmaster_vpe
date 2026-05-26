import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import { SplashScreen } from './components/Shell/SplashScreen';
import { initKeycloak } from './services/auth/KeycloakService';
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
    // We can either wait for authReady here or just proceed if the splash is long enough
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        {loading ? (
          <SplashScreen onFinish={handleFinish} />
        ) : (
          <Shell />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
