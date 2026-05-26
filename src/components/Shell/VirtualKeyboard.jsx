import React from 'react';
import { KFontText } from './KFontText';

export const VirtualKeyboard = ({ onKey, onBackspace, disabled, nameTaken, step }) => {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

  return (
    <div className='virtual-keyboard'>
      <div className='keyboard-grid'>
        {keys.map(char => (
          <button 
            key={char} 
            className={`key ${step === 'alias' && nameTaken ? 'taken' : ''}`}
            onClick={() => !disabled && onKey(char)}
            disabled={disabled}
          >
            <KFontText text={char} height={16} color="inherit" />
          </button>
        ))}
        <button 
          className='key action backspace' 
          onClick={() => !disabled && onBackspace()}
          disabled={disabled}
        >
          DEL
        </button>
      </div>
    </div>
  );
};