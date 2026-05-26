import { login, logout, getIdentity } from "../auth/KeycloakService";

export const handleUiActions = (action, val, state) => {
  if (action === "SWITCH_APP") return { newState: { currentApp: val } };
  if (action === "login") { 
    login(typeof val === 'object' ? val.id : val, typeof val === 'object' ? val : null); 
    const identity = getIdentity();
    return { 
      subtitle: `Uplink established. Identified as ${identity.name}.`,
      newState: { currentUser: identity } 
    }; 
  }
  if (action === "logout") { 
    logout(); 
    return { 
      subtitle: "Connection terminated. Rest well, user.",
      newState: { currentUser: getIdentity() } 
    }; 
  }
  if (action === "CLEAR_LOGS") return { subtitle: "System logs cleared." };
  if (action === "RUN_DIAG") return { subtitle: "Diagnostics complete." };
  if (action === "DUMP_LOGS") return { subtitle: "Logs dumped to clipboard." };
  if (action === "TOGGLE_DEBUG") return { subtitle: `Kernel debugger ${val ? 'active' : 'idle'}.` };
  if (action === "ADD_MEMBER_REQUEST") return { subtitle: "Register members via Identity Lab." };
  const flat = ["theme", "date", "location", "room", "registrationLink", "mapUrl", "zoomLink", "wordOfTheDay", "wordDefinition"];
  if (flat.includes(action)) return { subtitle: `${action} updated.`, newState: { [action]: val } };
  if (action.startsWith('roles.')) {
    const parts = action.split('.');
    if (parts[1] === 'speaker') {
      const field = parts[2];
      const next = state.roles.speakers.map(s => s.id === val.id ? { ...s, [field]: val.val } : s);
      return { subtitle: `Speaker updated.`, newState: { roles: { speakers: next } } };
    }
    return { subtitle: `${parts[1]} assigned.`, newState: { roles: { [parts[1]]: val } } };
  }
  if (action === 'updateMember') {
    const next = state.members.map(m => m.id === val.id ? { ...m, ...val } : m);
    return { subtitle: "Registry updated.", newState: { members: next } };
  }
  if (action === "addMember") return { subtitle: "New profile synchronized.", newState: { members: [...state.members, val] } };
  if (action === "deleteMember") return { subtitle: "Profile purged.", newState: { members: state.members.filter(m => m.id !== val) } };
  return { subtitle: "Action processed.", newState: { [action]: val } };
};