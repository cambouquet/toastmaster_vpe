import React from 'react';

interface Props {
  label: string;
  value: string | undefined;
  isEditing: boolean;
  onEdit: () => void;
  onBlur: (val: string) => void;
}

export const RoleEntry: React.FC<Props> = ({ 
  label, value, isEditing, onEdit, onBlur 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
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