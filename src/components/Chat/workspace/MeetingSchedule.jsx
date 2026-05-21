import React from 'react';
import { EditableCard } from '../shared/EditableCard';

export const MeetingSchedule = ({ state, editing, onEdit, onUpdate }) => {
  return (
    <>
      <EditableCard 
        label='Meeting Date' value={state.date}
        isEditing={editing === 'date'} onEdit={() => onEdit('date')}
        onBlur={(val) => onUpdate('date', val)} placeholder='TBD'
      />
      <EditableCard 
        label='Location / Uplink' value={state.location}
        isEditing={editing === 'location'} onEdit={() => onEdit('location')}
        onBlur={(val) => onUpdate('location', val)} placeholder='TBD'
      />
    </>
  );
};