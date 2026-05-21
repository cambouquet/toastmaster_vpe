import React from 'react';
import { EditableCard } from '../shared/EditableCard';

export const BriefingSection = ({ state, editing, onEdit, onUpdate }) => {
  return (
    <>
      <EditableCard 
        label='Meeting Theme' value={state.theme}
        isEditing={editing === 'theme'} onEdit={() => onEdit('theme')}
        onBlur={(val) => onUpdate('theme', val)}
      />
      <EditableCard 
        label='Word of the Day' value={state.wordOfTheDay}
        isEditing={editing === 'word'} onEdit={() => onEdit('word')}
        onBlur={(val) => onUpdate('wordOfTheDay', val)}
      />
      <EditableCard 
        label='Definition' value={state.wordDefinition}
        isEditing={editing === 'def'} onEdit={() => onEdit('def')}
        onBlur={(val) => onUpdate('wordDefinition', val)}
      />
    </>
  );
};