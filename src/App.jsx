import React, { useState } from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import { SplashScreen } from './components/Shell/SplashScreen';
import './App.scss';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        {loading ? (
          <SplashScreen onFinish={() => setLoading(false)} />
        ) : (
          <Shell />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
