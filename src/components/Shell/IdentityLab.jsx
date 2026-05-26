import React, { useState } from 'react';
import { EditableCard } from '../shared/EditableCard';
import { AppHeader } from '../shared/AppHeader';
import { IdentityCreationForm } from './IdentityCreationForm';
import { KFontValidator } from './KFontValidator';
import { Logo } from './Logo';
import { KIdBrand } from './KIdBrand';
import './IdentityLab.scss';

export const IdentityLab = ({ state, onAuth }) => {
  const [search, setSearch] = useState('');
  const members = state.members || [];
  const nameTaken = members.some(m => m.name.toUpperCase() === search.toUpperCase());

  const handleAuth = () => {
    if (search && !nameTaken) {
      onAuth('addMember', { 
        id: 'kid-' + Date.now(), 
        name: search.toUpperCase(), 
        role: 'K-USER', 
        title: 'K-IDENTITY VERIFIED', 
        status: 'STABLE' 
      });
    }
  };

  const handleKey = (char) => {
    if (search.length < 12) {
      setSearch(prev => prev + char);
    }
  };

  const handleBackspace = () => {
    setSearch(prev => prev.slice(0, -1));
  };

  return (
    <div className='workspace-screen identity-lab guest-mode'>
      <div className='background-logo'><Logo /></div>

      <div className='neural-link-bootstrap'>
        <div className='id-wordmark'>
          <KIdBrand className='brand-svg' text={search || "K-ID"} />
        </div>

        <div className='virtual-keyboard'>
          <div className='keyboard-grid'>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("").map(char => {
              const taken = members.some(m => m.name.toUpperCase().includes(char) && search.toUpperCase().includes(char)); 
              // Simple heuristic: if character is in a taken name and we are typing? 
              // User said "if taken, greyed out". Usually applies to the whole name.
              // Let's grey out specifically if the CURRENT search result (full word) exists.
              
              return (
                <button 
                  key={char} 
                  className={`key ${nameTaken ? 'taken' : ''}`}
                  onClick={() => handleKey(char)}
                >
                  {char}
                </button>
              );
            })}
            <button className='key action backspace' onClick={handleBackspace}>DEL</button>
          </div>
        </div>

        <button 
          className={`sync-trigger ${search && !nameTaken ? 'ready' : ''}`} 
          onClick={handleAuth}
          disabled={!search || nameTaken}
        >
          <span>{nameTaken ? 'IDENTITY TAKEN' : 'SYNC IDENTITY'}</span>
        </button>
      </div>

      <div className='guest-footer'>NEURAL_LINK // BOOTSTRAP_PROTOCOL_v4.2</div>
    </div>
  );
};
