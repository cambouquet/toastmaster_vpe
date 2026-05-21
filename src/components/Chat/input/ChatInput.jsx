import React, { useState, useEffect, useRef } from 'react';
import { DebugButton } from './DebugButton';
import './ChatInput.scss';

export const ChatInput = ({ onSend, onType, onToggleDebug, testStatus, ackCount }) => {
  const [text, setText] = useState(''), [waves, setWaves] = useState([]);
  const mRef = useRef(), [w, setW] = useState(0);

  useEffect(() => { if (mRef.current) setW(mRef.current.offsetWidth); }, [text]);

  useEffect(() => {
    if (!ackCount) return;
    const id = `wave-${ackCount}-${Math.random().toString(36).substr(2, 9)}`;
    setWaves(v => [...v.slice(-2), id]);
    setTimeout(() => setWaves(v => v.filter(i => i !== id)), 2000);
  }, [ackCount]);

  const send = (e) => { e.preventDefault(); if (text.trim()) { onSend(text); setText(''); }};
  return (
    <form className='chat-input' onSubmit={send}>
      <div className='input-container' style={{ '--tw': `${w}px` }}>
        {waves.map(id => (
          <div key={id} className='wave-layer'><div className='pulse-wave top'/></div>
        ))}
        <span ref={mRef} className='measure'>{text}</span>
        <input value={text} placeholder='What do you need?'
          onChange={e => { const v = e.target.value.slice(0, 180); setText(v); onType?.(v); }} />
        <div className='input-actions'>
          <div className='status-orb' /><span className='char-count'>{180 - text.length}</span>
          <DebugButton status={testStatus} onClick={onToggleDebug} />
        </div>
      </div>
    </form>
  );
};
