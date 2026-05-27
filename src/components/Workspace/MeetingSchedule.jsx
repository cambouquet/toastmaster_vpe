import React from 'react';
import { EditableCard } from '../shared/EditableCard';

export const MeetingSchedule = ({ state, editing, onEdit, onUpdate }) => {
  const edit = (k) => onEdit && onEdit(k);
  return (
    <>
      <EditableCard 
        label='Meeting Date' value={state.date}
        isEditing={editing === 'date'} onEdit={() => edit('date')}
        onBlur={(val) => onUpdate('date', val)} placeholder='TBD'
      />
      <EditableCard 
        label='Location' value={state.location}
        isEditing={editing === 'location'} onEdit={() => edit('location')}
        onBlur={(val) => onUpdate('location', val)} placeholder='TBD'
      />
      <EditableCard 
        label='Room' value={state.room}
        isEditing={editing === 'room'} onEdit={() => edit('room')}
        onBlur={(val) => onUpdate('room', val)} placeholder='None'
      />
      <EditableCard 
        label='Registration' value={state.registrationLink}
        isEditing={editing === 'reg'} onEdit={() => edit('reg')}
        onBlur={(val) => onUpdate('registrationLink', val)} placeholder='URL'
      />
      <EditableCard 
        label='Venue Map Link' value={state.mapUrl}
        isEditing={editing === 'map'} onEdit={() => edit('map')}
        onBlur={(val) => onUpdate('mapUrl', val)} placeholder='URL'
      />
      <EditableCard 
        label='Zoom Uplink' value={state.zoomLink}
        isEditing={editing === 'zoom'} onEdit={() => edit('zoom')}
        onBlur={(val) => onUpdate('zoomLink', val)} placeholder='None'
      />
    </>
  );
};