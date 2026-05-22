import React from 'react';
import { MeetingWorkspace } from '../Workspace/MeetingWorkspace';
import { MemberRegistry } from '../Members/MemberRegistry';

export const MainContent = ({ isWorkspace, state, uiAction }) => {
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
