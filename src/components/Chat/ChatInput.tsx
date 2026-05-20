import React, { useState } from 'react';
import './ChatInput.scss';

interface Props { onSend: (text: string) => void; }

export const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  const MAX_CHARS = 180;

  const handleSubmit = (e: React.FormEvent) => {
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
          placeholder="message vpe..."
        />
        <span className="char-count">
          {MAX_CHARS - text.length}
        </span>
      </div>
    </form>
  );
};
