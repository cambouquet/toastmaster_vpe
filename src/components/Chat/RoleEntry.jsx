import React from 'react';

export const RoleEntry = ({ 
  label, value, isEditing, onEdit, onBlur 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  };

  return (
    <div className={`role-entry ${isEditing ? 'editing' : ''}`} onClick={onEdit}>
      <span className="role-label">{label}</span>
      <div className="role-input-wrap">
        <div className={`role-val ${!value ? 'open' : ''} ${isEditing ? 'hidden' : ''}`}>
          {value || 'Open'}
        </div>
        {isEditing && (
          <input
            autoFocus
            className="inline-input-small"
            defaultValue={value}
            onBlur={(e) => onBlur(e.target.value.trim())}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};
