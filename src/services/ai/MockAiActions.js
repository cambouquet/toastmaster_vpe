import { login, logout } from "../auth/KeycloakService";

export const handleUiActions = (action, val, state) => {
  if (action === "SWITCH_APP") return { newState: { currentApp: val } };
  if (action === "login") { login(typeof val === 'object' ? val.id : val, typeof val === 'object' ? val : null); return {}; }
  if (action === "logout") { logout(); return {}; }
  if (action === "CLEAR_LOGS") return { notification: "System logs cleared." };
  if (action === "RUN_DIAG") return { notification: "Diagnostics complete." };
  if (action === "DUMP_LOGS") return { notification: "Logs dumped to clipboard." };
  if (action === "TOGGLE_DEBUG") return { notification: `Kernel debugger ${val ? 'active' : 'idle'}.` };
  if (action === "ADD_MEMBER_REQUEST") return { notification: "Register members via Mission Control." };
  const flat = ["theme", "date", "location", "room", "registrationLink", "mapUrl", "zoomLink", "wordOfTheDay", "wordDefinition"];
  if (flat.includes(action)) return { notification: `${action} updated.`, newState: { [action]: val } };
  if (action.startsWith('roles.')) {
    const parts = action.split('.');
    if (parts[1] === 'speaker') {
      const field = parts[2];
      const next = state.roles.speakers.map(s => s.id === val.id ? { ...s, [field]: val.val } : s);
      return { notification: `Speaker updated.`, newState: { roles: { speakers: next } } };
    }
    return { notification: `${parts[1]} assigned.`, newState: { roles: { [parts[1]]: val } } };
  }
  if (action === "editMember") {
    const next = state.members.map(m => m.id === val.id ? { ...m, ...val.updates } : m);
    return { notification: "Registry updated.", newState: { members: next } };
  }
  if (action === "addMember") return { notification: "New node synchronized.", newState: { members: [...state.members, val] } };
  if (action === "deleteMember") return { notification: "Node purged.", newState: { members: state.members.filter(m => m.id !== val) } };
  return { notification: "Action processed.", newState: { [action]: val } };
};