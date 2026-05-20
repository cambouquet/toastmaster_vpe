export const INITIAL_STATE = {
  status: 'planning', 
  roles: { speakers: [] },
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
