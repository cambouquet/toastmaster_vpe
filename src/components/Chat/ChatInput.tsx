import React, { useState } from 'react';

interface Props { onSend: (text: string) => void; }

export const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
