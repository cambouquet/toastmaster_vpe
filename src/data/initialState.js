import { MEMBERS_DATA } from './members';

export const INITIAL_STATE = {
  status: 'planning', 
  theme: 'Visionary Futures',
  date: '2026-05-27',
  location: 'Terminal 4 / Node-77',
  room: 'Cyber-Hall B',
  registrationLink: 'https://tm.web/register-77',
  mapUrl: 'https://maps.google.com/?q=Terminal+4',
  zoomLink: 'https://tm.web/uplink-77',
  wordOfTheDay: 'Resilience',
  wordDefinition: 'The capacity to recover quickly from difficulties.',
  ahCount: 0,
  roles: { 
    host: 'Alice Chen', 
    observer: 'Bob Smith', 
    speaker: 'Catherine Miller',
    timer: 'David Wilson', 
    scribe: 'Elena Rodriguez', 
    reviewer: 'Frank Thompson',
    speakers: [
      { id: 1, name: 'Grace Lee', title: 'The AI Revolution', evaluator: 'Henry Ford' },
      { id: 2, name: 'Ivy Watson', title: 'Cybernetic Dreams', evaluator: 'Jack Reacher' },
      { id: 3, name: 'Leo Messi', title: 'Digital Pitch Control', evaluator: 'Karen Page' }
    ]
  },
  currentApp: 'launcher',
  currentScreen: 'workspace',
  members: MEMBERS_DATA
};
