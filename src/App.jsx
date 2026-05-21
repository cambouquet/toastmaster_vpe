import React from 'react';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { ChatContainer } from './components/Chat/ChatContainer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="glitch-scanline"></div>
      <ErrorBoundary>
        <ChatContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
