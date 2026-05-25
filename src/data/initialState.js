import { MEMBERS_DATA } from './members';

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
  currentApp: 'toastmaster',
  currentScreen: 'workspace',
  members: MEMBERS_DATA
};
