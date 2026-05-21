import React from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Shell } from './components/Shell/Shell';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        <Shell />
      </ErrorBoundary>
    </div>
  );
}

export default App;
