import React from 'react';
import { MeetingState } from '../../models/Collaboration';
import './Workspace.scss';

interface Props { 
  state: MeetingState; 
  onAction: (type: string, val: any) => void; 
}

export const MeetingWorkspace: React.FC<Props> = ({ state, onAction }) => {
  const [isEditingTheme, setIsEditingTheme] = React.useState(false);

  const handleThemeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditingTheme(false);
    const val = e.target.value.trim();
    if (val && val !== state.theme) {
      onAction('theme', val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
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
        <div className="role-entry">
          <span className="role-label">Toastmaster</span>
          <span className={`role-val ${!state.roles.toastmaster ? 'open' : ''}`}>
            {state.roles.toastmaster || 'Open'}
          </span>
        </div>
        <div className="role-entry">
          <span className="role-label">Timer</span>
          <span className={`role-val ${!state.roles.timer ? 'open' : ''}`}>
            {state.roles.timer || 'Open'}
          </span>
        </div>
      </div>
      <div className="card date">
        <label>Meeting Date</label>
        <div className="val">{state.date || 'TBD'}</div>
      </div>
    </div>
  );
};
