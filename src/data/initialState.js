export const INITIAL_STATE = {
  status: 'planning', 
  roles: { speakers: [] },
  currentScreen: 'workspace',
  members: [
    { id: '1', name: 'Alice Chen', pathways: ['DYNAMIC_LEADERSHIP'], level: 3, status: 'ONLINE' },
    { id: '2', name: 'Bob Smith', pathways: ['STRATEGIC_RELATIONSHIPS'], level: 2, status: 'ONLINE' },
    { id: '3', name: 'Catherine Miller', pathways: ['PRESENTATION_MASTERY'], level: 5, status: 'STDBY' },
    { id: '4', name: 'David Wilson', pathways: ['INNOVATIVE_PLANNING'], level: 1, status: 'ONLINE' },
    { id: '5', name: 'Elena Rodriguez', pathways: ['LEADERSHIP_DEVELOPMENT'], level: 4, status: 'ONLINE' },
    { id: '6', name: 'Frank Thompson', pathways: ['EFFECTIVE_COACHING'], level: 2, status: 'STDBY' },
    { id: '7', name: 'Grace Lee', pathways: ['TEAM_COLLABORATION'], level: 3, status: 'ONLINE' }
  ]
};
