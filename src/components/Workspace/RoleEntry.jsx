import React, { useEffect, useRef } from 'react';
import { RoleDropdown } from './RoleDropdown';

export const RoleEntry = ({ label, value, members, isEditing, onEdit, onBlur }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onBlur(value);
    };
    if (isEditing) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isEditing, onBlur, value]);

  return (
    <div 
      className={`role-entry ${isEditing ? 'editing' : ''}`} 
      onClick={onEdit} 
      ref={dropdownRef}
    >
      <span className='role-label'>{label}</span>
      <div className='role-input-wrap'>
        <div className={`role-val ${!value ? 'open' : ''}`}>
          {value || 'Open'}
        </div>
        {isEditing && (
          <RoleDropdown 
            value={value} 
            members={members} 
            onSelect={onBlur} 
          />
        )}
      </div>
    </div>
  );
};