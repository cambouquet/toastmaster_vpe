import React, { useState } from 'react';
import { ChatContainer } from './components/Chat/ChatContainer';
import { MemberRegistry } from './components/Members/MemberRegistry';
import { Navigation } from './components/shared/Navigation/Navigation';
import './App.scss';

function App() {
  const [screen, setScreen] = useState('workspace');

  return (
    <div className="App">
      <Navigation current={screen} onNavigate={setScreen} />
      {screen === 'workspace' ? (
        <ChatContainer />
      ) : (
        <MemberRegistry />
      )}
    </div>
  );
}

export default App;
