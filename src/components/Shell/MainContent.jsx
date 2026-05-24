import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';
import { MissionControl } from './MissionControl';

export const MainContent = ({ isWorkspace, state, uiAction }) => {
  if (state.currentApp === 'mission-control') {
    return <MissionControl state={state} />;
  }

  if (isWorkspace) {
    return <MeetingWorkspace state={state} onAction={uiAction} />;
  }

  return (
    <MemberRegistry 
      members={state.members} 
      onAction={uiAction} 
      currentUser={state.currentUser} 
    />
  );
};
