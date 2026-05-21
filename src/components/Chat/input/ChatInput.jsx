import React, { useState, useEffect } from 'react';
import { DebugButton } from './DebugButton';
import './ChatInput.scss';

export const ChatInput = ({ onSend, onType, onToggleDebug, testStatus, ackCount }) => {
  const [text, setText] = useState(''), [ackPulse, setAckPulse] = useState(false);

  useEffect(() => {
    if (ackCount > 0) {
      setAckPulse(true);
      const t = setTimeout(() => setAckPulse(false), 900);
      return () => clearTimeout(t);
    }
  }, [ackCount]);

  const send = (e) => {
    e.preventDefault();
    if (text.trim()) { onSend(text); setText(''); }
  };

  return (
    <form className="chat-input" onSubmit={send}>
      <div className={`input-container ${ackPulse ? 'pulse' : ''}`}>
        <div className="pulse-wave" />
        <input 
          value={text} 
          onChange={(e) => { const v = e.target.value.slice(0, 180); setText(v); onType?.(v); }} 
          placeholder="What do you need?" 
        />
        <div className={`input-actions ${ackPulse ? 'pulse' : ''}`}>
          <div className="status-orb" />
          <span className="char-count">{180 - text.length}</span>
          <DebugButton status={testStatus} onClick={onToggleDebug} />
        </div>
      </div>
    </form>
  );
};
