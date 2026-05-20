import React from 'react';
import './Chat.scss';

export const MessageItem = ({ message }) => {
  return (
    <div className={`message-item ${message.sender}`}>
      <div className="message-content">
        {message.text}
      </div>
      <span className="timestamp">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
};
