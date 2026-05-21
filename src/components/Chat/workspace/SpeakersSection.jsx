import React from 'react';
import { EditableCard } from '../shared/EditableCard';
import './SpeakersSection.scss';

export const SpeakersSection = ({ speakers, onAction }) => {
  return (
    <div className='card speakers-card'>
      <label>Speakers & Speeches</label>
      <div className='speakers-list'>
        {speakers.map(s => (
          <div key={s.id} className='speaker-row'>
            <div className='slot-id'>SLOT {s.id}</div>
            <div className='speaker-fields'>
              <input 
                placeholder='Speaker Name'
                defaultValue={s.name}
                onBlur={(e) => onAction('roles.speaker.name', { id: s.id, val: e.target.value })}
              />
              <input 
                placeholder='Speech Title'
                defaultValue={s.title}
                onBlur={(e) => onAction('roles.speaker.title', { id: s.id, val: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};