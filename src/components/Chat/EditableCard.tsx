import React from 'react';

interface Props {
  label: string;
  value: string | undefined;
  isEditing: boolean;
  onEdit: () => void;
  onBlur: (val: string) => void;
  placeholder?: string;
}

export const EditableCard: React.FC<Props> = ({ 
  label, value, isEditing, onEdit, onBlur, placeholder = 'Undefined' 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
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