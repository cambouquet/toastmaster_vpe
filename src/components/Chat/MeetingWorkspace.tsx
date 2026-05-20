import React from 'react';
import { MeetingState } from '../../models/Collaboration';
import './Workspace.scss';

interface Props { 
  state: MeetingState; 
  onAction: (type: string, val: any) => void; 
}

export const MeetingWorkspace: React.FC<Props> = ({ state, onAction }) => {
  const [isEditingTheme, setIsEditingTheme] = React.useState(false);
  const [isEditingDate, setIsEditingDate] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState<string | null>(null);

  const handleThemeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditingTheme(false);
    const val = e.target.value.trim();
    if (val && val !== state.theme) onAction('theme', val);
  };

  const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditingDate(false);
    const val = e.target.value.trim();
    if (val && val !== state.date) onAction('date', val);
  };

  const handleRoleBlur = (roleKey: string, e: React.FocusEvent<HTMLInputElement>) => {
    setEditingRole(null);
    const val = e.target.value.trim();
    const currentVal = (state.roles as any)[roleKey];
    if (val && val !== currentVal) onAction(`roles.${roleKey}`, val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
  };

  return (
    <div className="workspace-grid" style={{ paddingTop: '4rem' }}>
      <div 
        className={`card theme ${isEditingTheme ? 'editing' : ''}`} 
        onClick={() => !isEditingTheme && setIsEditingTheme(true)}
      >
        <label>Current Theme</label>
        <div className="val-stack">
          <div className={`val ${isEditingTheme ? 'hidden' : ''}`}>
            {state.theme || 'Undefined'}
          </div>
          {isEditingTheme && (
            <input
              autoFocus
              className="inline-input"
              defaultValue={state.theme}
              onBlur={handleThemeBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </div>

      <div className="card roles">
        <label>Key Roles</label>
        <div className="role-stack">
          {['toastmaster', 'timer'].map(role => (
            <div 
              key={role}
              className={`role-entry ${editingRole === role ? 'editing' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                setEditingRole(role);
              }}
            >
              <span className="role-label">
                {role === 'toastmaster' ? 'Toastmaster' : 'Timer'}
              </span>
              <div className="role-input-wrap">
                <div className={`role-val ${!(state.roles as any)[role] ? 'open' : ''} ${editingRole === role ? 'hidden' : ''}`}>
                  {(state.roles as any)[role] || 'Open'}
                </div>
                {editingRole === role && (
                  <input
                    autoFocus
                    className="inline-input-small"
                    defaultValue={(state.roles as any)[role]}
                    onBlur={(e) => handleRoleBlur(role, e)}
                    onKeyDown={handleKeyDown}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
        className={`card date ${isEditingDate ? 'editing' : ''}`}
        onClick={() => !isEditingDate && setIsEditingDate(true)}
      >
        <label>Meeting Date</label>
        <div className="val-stack">
          <div className={`val ${isEditingDate ? 'hidden' : ''}`}>
            {state.date || 'TBD'}
          </div>
          {isEditingDate && (
            <input
              autoFocus
              className="inline-input"
              defaultValue={state.date}
              onBlur={handleDateBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </div>
    </div>
  );
};
