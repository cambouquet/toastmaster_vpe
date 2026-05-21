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
        label='Location' value={state.location}
        isEditing={editing === 'location'} onEdit={() => onEdit('location')}
        onBlur={(val) => onUpdate('location', val)} placeholder='TBD'
      />
      <EditableCard 
        label='Room' value={state.room}
        isEditing={editing === 'room'} onEdit={() => onEdit('room')}
        onBlur={(val) => onUpdate('room', val)} placeholder='None'
      />
      <EditableCard 
        label='Registration' value={state.registrationLink}
        isEditing={editing === 'reg'} onEdit={() => onEdit('reg')}
        onBlur={(val) => onUpdate('registrationLink', val)} placeholder='URL'
      />
      <EditableCard 
        label='Venue Map Link' value={state.mapUrl}
        isEditing={editing === 'map'} onEdit={() => onEdit('map')}
        onBlur={(val) => onUpdate('mapUrl', val)} placeholder='URL'
      />
      <EditableCard 
        label='Zoom Uplink' value={state.zoomLink}
        isEditing={editing === 'zoom'} onEdit={() => onEdit('zoom')}
        onBlur={(val) => onUpdate('zoomLink', val)} placeholder='None'
      />
    </>
  );
};