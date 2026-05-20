import React, { useEffect, useRef } from 'react';
import { CLUB_MEMBERS } from '../../models/Members';

export const RoleEntry = ({ 
  label, value, isEditing, onEdit, onBlur 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onBlur(value);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, onBlur, value]);

  return (
    <div 
      className={`role-entry ${isEditing ? 'editing' : ''}`} 
      onClick={onEdit}
      ref={dropdownRef}
    >
      <span className="role-label">{label}</span>
      <div className="role-input-wrap">
        <div className={`role-val ${!value ? 'open' : ''}`}>
          {value || 'Open'}
        </div>
        {isEditing && (
          <div className="custom-dropdown">
            <div className="dropdown-item clear" onClick={(e) => {
              e.stopPropagation();
              onBlur('');
            }}>Clear Role</div>
            {CLUB_MEMBERS.map(m => (
              <div 
                key={m} 
                className={`dropdown-item ${value === m ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onBlur(m);
                }}
              >
                {m} {value === m && '•'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
