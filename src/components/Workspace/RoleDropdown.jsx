import React from 'react';

export const RoleDropdown = ({ value, members = [], onSelect }) => (
  <div className="custom-dropdown">
    <div className="dropdown-item clear" onClick={(e) => {
      e.stopPropagation();
      onSelect('');
    }}>Clear Role</div>
    {members.map(m => (
      <div 
        key={m.id} 
        className={`dropdown-item ${value === m.name ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(m.name);
        }}
      >
        {m.name} {value === m.name && '•'}
      </div>
    ))}
  </div>
);
