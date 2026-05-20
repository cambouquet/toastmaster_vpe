import React from 'react';
import { MeetingState } from '../../models/Collaboration';
import './Workspace.scss';

interface Props { 
  state: MeetingState; 
  onAction: (type: string, val: any) => void; 
}

export const MeetingWorkspace: React.FC<Props> = ({ state, onAction }) => {
  return (
    <div className="workspace-grid" style={{ paddingTop: '4rem' }}>
      <div className="card theme" onClick={() => onAction('theme', 'Prompting Theme...')}>
        <label>Current Theme</label>
        <div className="val">{state.theme || 'Undefined'}</div>
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
