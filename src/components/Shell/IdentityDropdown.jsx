import React, { useState, useEffect, useRef } from 'react';
import { IdentityCreationForm } from './IdentityCreationForm';
import { IdentityList } from './IdentityList';
import './IdentityDropdown.scss';

export const IdentityDropdown = ({ onAuth, onClose, search, setSearch }) => {
  const [isCreating, setIsCreating] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => ref.current && !ref.current.contains(e.target) && onClose();
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="role-selector" ref={ref}>
      <button className="close-btn" onClick={onClose}>×</button>
      {isCreating ? (
        <IdentityCreationForm search={search} setSearch={setSearch} 
          onAuth={onAuth} onCancel={() => setIsCreating(false)} />
      ) : (
        <IdentityList search={search} setSearch={setSearch} 
          onAuth={onAuth} onCreate={() => setIsCreating(true)} />
      )}
    </div>
  );
};
