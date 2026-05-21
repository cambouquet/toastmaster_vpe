import React, { useState } from 'react';
import { DebugButton } from './DebugButton';
import './ChatInput.scss';

export const ChatInput = ({ onSend, onType, onToggleDebug, testStatus }) => {
  const [text, setText] = useState('');
  const MAX_CHARS = 180;

  const handleChange = (e) => {
    const val = e.target.value.slice(0, MAX_CHARS);
    setText(val);
    onType?.(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <input value={text} onChange={handleChange} placeholder="What do you need?" />
        <div className="input-actions">
          <div className="status-orb" />
          <span className="char-count">{MAX_CHARS - text.length}</span>
          <DebugButton status={testStatus} onClick={onToggleDebug} />
        </div>
      </div>
    </form>
  );
};
