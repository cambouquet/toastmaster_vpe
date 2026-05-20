import React, { useState } from 'react';
import './ChatInput.scss';

export const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const MAX_CHARS = 180;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))} 
          placeholder="What do you need?"
        />
        <div className="input-actions">
          <span className="char-count">{MAX_CHARS - text.length}</span>
        </div>
      </div>
    </form>
  );
};
