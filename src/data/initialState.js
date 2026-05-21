export const INITIAL_STATE = {
  status: 'planning', 
  theme: 'Visionary Futures',
  date: '2026-05-27',
  location: 'Terminal 4 / Node-77',
  room: 'Cyber-Hall B',
  registrationLink: '',
  mapUrl: '',
  zoomLink: 'https://tm.web/uplink-77',
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
      { id: 1, name: '', title: '', evaluator: '' },
      { id: 2, name: '', title: '', evaluator: '' },
      { id: 3, name: '', title: '', evaluator: '' }
    ]
  },
  currentScreen: 'workspace',
  members: [
    { id: '1', name: 'Alice Chen', role: 'VPE', title: 'VP EDUCATION', enrolled: [{ name: 'Dynamic Leadership', level: 3 }], status: 'ONLINE' },
    { id: '0', name: 'Dev Admin', role: 'VPE', title: 'SYSTEM ARCHITECT', enrolled: [], status: 'ONLINE' },
    { id: '2', name: 'Bob Smith', role: 'MEMBER', title: 'PRESIDENT', enrolled: [{ name: 'Strategic Relationships', level: 2 }], status: 'ONLINE' },
    { id: '3', name: 'Catherine Miller', role: 'MEMBER', title: 'VP MEMBERSHIP', enrolled: [{ name: 'Presentation Mastery', level: 5 }], status: 'STDBY' },
    { id: '4', name: 'David Wilson', role: 'MEMBER', title: 'SECRETARY', enrolled: [{ name: 'Innovative Planning', level: 1 }], status: 'ONLINE' },
    { id: '5', name: 'Elena Rodriguez', role: 'MEMBER', title: 'TREASURER', enrolled: [{ name: 'Leadership Development', level: 4 }], status: 'ONLINE' },
    { id: '6', name: 'Frank Thompson', role: 'GUEST', title: 'GUEST', enrolled: [{ name: 'Effective Coaching', level: 2 }], status: 'STDBY' },
    { id: '7', name: 'Grace Lee', role: 'MEMBER', title: 'SERGEANT AT ARMS', enrolled: [{ name: 'Team Collaboration', level: 3 }], status: 'ONLINE' }
  ]
};
