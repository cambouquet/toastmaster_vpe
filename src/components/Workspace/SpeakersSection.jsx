import React from 'react';
import { RoleEntry } from './RoleEntry';
import './SpeakersSection.scss';

export const SpeakersSection = ({ speakers, members, editing, onEdit, onAction, currentUser }) => {
  const isVpe = currentUser?.role === 'VPE';
  return (
    <div className='card speakers-card'>
      <label>Speakers & Evaluations</label>
      <div className='speakers-list'>
        {speakers.map(s => (
          <div key={s.id} className='speaker-row'>
            <div className='slot-id'>SLOT {s.id}</div>
            <div className='speaker-config'>
              <RoleEntry 
                label="Speaker" value={s.name} 
                members={isVpe ? members : (currentUser?.role === 'MEMBER' ? members.filter(m => m.name === currentUser?.name) : [])}
                isEditing={editing === `spk-${s.id}`} 
                onEdit={() => (isVpe || (currentUser?.role === 'MEMBER' && (!s.name || s.name === currentUser?.name))) && onEdit(`spk-${s.id}`)}
                onBlur={(v) => { onEdit(null); onAction('roles.speaker.name', { id: s.id, val: v }); }}
              />
              <div className="title-input">
                <label className="sub-label">Speech Title</label>
                <input 
                  defaultValue={s.title}
                  disabled={!isVpe && (currentUser?.role !== 'MEMBER' || s.name !== currentUser?.name)}
                  onBlur={(e) => onAction('roles.speaker.title', { id: s.id, val: e.target.value })}
                />
              </div>
              <RoleEntry 
                label="Evaluator" value={s.evaluator} 
                members={isVpe ? members : (currentUser?.role === 'MEMBER' ? members.filter(m => m.name === currentUser?.name) : [])}
                isEditing={editing === `eval-${s.id}`} 
                onEdit={() => (isVpe || (currentUser?.role === 'MEMBER' && (!s.evaluator || s.evaluator === currentUser?.name))) && onEdit(`eval-${s.id}`)}
                onBlur={(v) => { onEdit(null); onAction('roles.speaker.evaluator', { id: s.id, val: v }); }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};