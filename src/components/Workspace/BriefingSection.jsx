import React from 'react';
import { EditableCard } from '../shared/EditableCard';

export const BriefingSection = ({ state, editing, onEdit, onUpdate }) => {
  const edit = (k) => onEdit && onEdit(k);
  return (
    <>
      <EditableCard 
        label='Word of the Day' value={state.wordOfTheDay}
        isEditing={editing === 'word'} onEdit={() => edit('word')}
        onBlur={(val) => onUpdate('wordOfTheDay', val)}
      />
      <EditableCard 
        label='Definition' value={state.wordDefinition}
        isEditing={editing === 'def'} onEdit={() => edit('def')}
        onBlur={(val) => onUpdate('wordDefinition', val)}
      />
    </>
  );
};