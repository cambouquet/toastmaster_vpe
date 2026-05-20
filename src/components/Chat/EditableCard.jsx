import React from 'react';

export const EditableCard = ({ 
  label, value, isEditing, onEdit, onBlur, placeholder = 'Undefined' 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  };

  return (
    <div className={`card ${isEditing ? 'editing' : ''}`} onClick={onEdit}>
      <label>{label}</label>
      <div className="val-stack">
        <div className={`val ${isEditing ? 'hidden' : ''}`}>
          {value || placeholder}
        </div>
        {isEditing && (
          <input
            autoFocus
            className="inline-input"
            defaultValue={value}
            onBlur={(e) => onBlur(e.target.value.trim())}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};
