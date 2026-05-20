import React from 'react';
import { CLUB_MEMBERS } from '../../../models/Members';

export const RoleDropdown = ({ value, onSelect }) => (
  <div className="custom-dropdown">
    <div className="dropdown-item clear" onClick={(e) => {
      e.stopPropagation();
      onSelect('');
    }}>Clear Role</div>
    {CLUB_MEMBERS.map(m => (
      <div 
        key={m} 
        className={`dropdown-item ${value === m ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(m);
        }}
      >
        {m} {value === m && '•'}
      </div>
    ))}
  </div>
);
