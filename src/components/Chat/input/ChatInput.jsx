import React, { useState, useEffect, useRef } from 'react';
import { DebugButton } from './DebugButton';
import './ChatInput.scss';

export const ChatInput = ({ onSend, onType, onToggleDebug, testStatus, ackCount }) => {
  const [text, setText] = useState(''), [ackPulse, setAckPulse] = useState(false);
  const mRef = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (mRef.current) {
      // Force a small delay to ensure rendering is complete before measuring
      const timer = setTimeout(() => {
        setW(mRef.current.offsetWidth);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [text]);

  useEffect(() => {
    if (ackCount > 0) {
      setAckPulse(true);
      const t = setTimeout(() => setAckPulse(false), 1000);
      return () => clearTimeout(t);
    }
  }, [ackCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <div className={`input-container ${ackPulse ? 'pulse' : ''}`} style={{ '--tw': `${w}px` }}>
        <div className="pulse-wave" />
        <span ref={mRef} className="measure">{text}</span>
        <input value={text} onChange={(e) => { const v = e.target.value.slice(0, 180); setText(v); onType?.(v); }} placeholder="What do you need?" />
        <div className={`input-actions ${ackPulse ? 'pulse' : ''}`}>
          <div className="status-orb" />
          <span className="char-count">{180 - text.length}</span>
          <DebugButton status={testStatus} onClick={onToggleDebug} />
        </div>
      </div>
    </form>
  );
};
