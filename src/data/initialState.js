export const INITIAL_STATE = {
  status: 'planning', 
  theme: 'Visionary Futures',
  date: '2026-05-27',
  location: 'Terminal 4 / Node-77',
  wordOfTheDay: 'Resilience',
  wordDefinition: 'The capacity to recover quickly from difficulties.',
  roles: { 
    toastmaster: '', 
    genEvaluator: '', 
    topicsMaster: '',
    timer: '', 
    grammarian: '', 
    ahCounter: '',
    speakers: [
      { id: 1, name: '', title: '', pathway: '', level: '' },
      { id: 2, name: '', title: '', pathway: '', level: '' },
      { id: 3, name: '', title: '', pathway: '', level: '' }
    ]
  },
  currentScreen: 'workspace',
  members: [
    { id: '1', name: 'Alice Chen', enrolled: [{ name: 'Dynamic Leadership', level: 3 }], status: 'ONLINE' },
    { id: '2', name: 'Bob Smith', enrolled: [{ name: 'Strategic Relationships', level: 2 }], status: 'ONLINE' },
    { id: '3', name: 'Catherine Miller', enrolled: [{ name: 'Presentation Mastery', level: 5 }], status: 'STDBY' },
    { id: '4', name: 'David Wilson', enrolled: [{ name: 'Innovative Planning', level: 1 }], status: 'ONLINE' },
    { id: '5', name: 'Elena Rodriguez', enrolled: [{ name: 'Leadership Development', level: 4 }], status: 'ONLINE' },
    { id: '6', name: 'Frank Thompson', enrolled: [{ name: 'Effective Coaching', level: 2 }], status: 'STDBY' },
    { id: '7', name: 'Grace Lee', enrolled: [{ name: 'Team Collaboration', level: 3 }], status: 'ONLINE' }
  ]
};
