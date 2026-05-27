import React from 'react';
import { RoleEntry } from './RoleEntry';
import './SpeakersSection.scss';

export const SpeakersSection = ({ speakers, members, editing, onEdit, onAction, currentUser }) => {
  const isVpe = currentUser?.role === 'VPE' || currentUser?.role === 'ADMIN';
  const myMem = (m) => isVpe ? m : (currentUser?.role === 'MEMBER' ? m.filter(x => x.name === currentUser?.name) : []);
  const canEd = (s, f) => isVpe || (currentUser?.role === 'MEMBER' && (!s[f] || s[f] === currentUser?.name));

  return (
    <div className='card speakers-card'>
      <label>Speakers & Evaluations</label>
      <div className='speakers-list'>{speakers.map(s => (
          <div key={s.id} className='speaker-row'>
            <div className='slot-id'>SLOT {s.id}</div>
            <div className='speaker-config'>
              <RoleEntry label="Speaker" value={s.name} members={myMem(members)} isEditing={editing === `spk-${s.id}`} 
                onEdit={canEd(s, 'name') ? () => onEdit(`spk-${s.id}`) : null} onBlur={(v) => { onEdit(null); onAction('roles.speaker.name', { id: s.id, val: v }); }} />
              <div className="title-input">
                <label className="sub-label">Speech Title</label>
                <input defaultValue={s.title} disabled={!canEd(s, 'name')} onBlur={(e) => onAction('roles.speaker.title', { id: s.id, val: e.target.value })} />
              </div>
              <RoleEntry label="Evaluator" value={s.evaluator} members={myMem(members)} isEditing={editing === `eval-${s.id}`} 
                onEdit={canEd(s, 'evaluator') ? () => onEdit(`eval-${s.id}`) : null} onBlur={(v) => { onEdit(null); onAction('roles.speaker.evaluator', { id: s.id, val: v }); }} />
            </div>
          </div>
        ))}</div>
    </div>
  );
};