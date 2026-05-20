import React from 'react';
import { MeetingState } from '../../models/Collaboration';
import './Workspace.scss';

interface Props { 
  state: MeetingState; 
  onAction: (type: string, val: any) => void; 
}

export const MeetingWorkspace: React.FC<Props> = ({ state, onAction }) => {
  return (
    <div className="workspace-grid">
      <div className="card theme" onClick={() => onAction('theme', 'Prompting Theme...')}>
        <label>MEETING_THEME</label>
        <div className="val">{state.theme || 'NONE_SET'}</div>
      </div>
      <div className="card roles">
        <label>ACTIVE_ROLES</label>
        <ul>
          <li>TM: {state.roles.toastmaster || 'OPEN'}</li>
          <li>TIMER: {state.roles.timer || 'OPEN'}</li>
        </ul>
      </div>
      <div className="card date">
        <label>CHRONOS</label>
        <div className="val">{state.date || 'UNSCHEDULED'}</div>
      </div>
    </div>
  );
};
