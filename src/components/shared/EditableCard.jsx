import React from 'react';

export const EditableCard = ({ 
  label, value, isEditing, onEdit, onBlur, placeholder = 'Undefined' 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  };

  const isLink = value && (value.startsWith('http') || value.startsWith('www'));

  const renderValue = () => {
    if (!value) return placeholder;
    if (isLink && !isEditing) {
      return (
        <a 
          href={value.startsWith('http') ? value : `https://${value}`} 
          target="_blank" rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="tactical-link"
        >
          {value}
        </a>
      );
    }
    return value;
  };

  return (
    <div className={`card ${onEdit ? 'clickable' : ''} ${isEditing ? 'editing' : ''}`} onClick={onEdit}>
      <label>{label}</label>
      <div className="val-stack">
        <div className={`val ${isEditing ? 'hidden' : ''}`}>
          {renderValue()}
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

