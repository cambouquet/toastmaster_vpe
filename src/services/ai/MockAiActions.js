import { login, logout, getIdentity } from "../auth/KeycloakService";
export const handleUiActions = (action, val, state) => {
  if (action === "SWITCH_APP") return { newState: { currentApp: val } };
  if (action === "login") { 
    login(typeof val === 'object' ? val.id : val, typeof val === 'object' ? val : null); 
    const id = getIdentity();
    return { subtitle: `Uplink established. Identified as ${id.name}.`, newState: { currentUser: id } };
  }
  if (action === "logout") { logout(); return { subtitle: "Connection terminated.", newState: { currentUser: getIdentity() } }; }
  const n = (m, s={}) => ({ notification: m, newState: { ...s, [action]: val } });
  if (action === "CLEAR_LOGS") return n("System logs cleared.");
  if (action === "RUN_DIAG") return n("Diagnostics complete.");
  if (action === "DUMP_LOGS") return n("Logs dumped to clipboard.");
  if (action === "TOGGLE_DEBUG") return n(`Kernel debugger ${val ? 'active' : 'idle'}.`);
  if (action === "ADD_MEMBER_REQUEST") return { subtitle: "Register members via Identity Lab." };
  const flat = ["theme", "date", "location", "room", "registrationLink", "mapUrl", "zoomLink", "wordOfTheDay", "wordDefinition"];
  if (flat.includes(action)) return n(`${action} updated.`);
  if (action.startsWith('roles.')) {
    const p = action.split('.');
    if (p[1] === 'speaker') {
      const next = state.roles.speakers.map(s => s.id === val.id ? { ...s, [p[2]]: val.val } : s);
      return { notification: `Speaker updated.`, newState: { roles: { speakers: next } } };
    }
    return { notification: `${p[1]} assigned.`, newState: { roles: { [p[1]]: val } } };
  }
  if (action === 'updateMember') return { notification: "Registry updated.", newState: { members: state.members.map(m => m.id === val.id ? { ...m, ...val } : m) } };
  if (action === 'addMember') return { notification: "New profile synchronized.", newState: { members: [...state.members, val] } };
  if (action === 'deleteMember') return { notification: "Profile purged.", newState: { members: state.members.filter(m => m.id !== val) } };
  if (action === 'TIMER_START') return { notification: 'Timer started.', subtitle: `The floor is yours, ${val}. I'm timing this session now.` };
  const silent = ['time-', 'ah-', 'gram-', 'eval-', 'wotd-'];
  if (silent.some(s => action.startsWith(s))) return { newState: { [action]: val } };
  return { notification: "Action processed.", newState: { [action]: val } };
};