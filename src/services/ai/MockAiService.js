import { handleMembers } from "./intentHandlers";
import { AgentService } from "./AgentService";
import { login, logout } from "../auth/KeycloakService";

export class MockAiService {
  login() { login(); }
  logout() { logout(); }

  async processInput(text, state, onStream) {
    const input = text.toLowerCase();
    
    if (input === "login") {
      login();
      return { };
    }

    if (input === "logout") {
      logout();
      return { };
    }

    if (input.includes("agent") || input.includes("connect")) {
      return AgentService.streamFromMockAgent(text, onStream);
    }
    const res = handleMembers(input, text, state);
    if (res) return res;

    if (input.includes("theme")) {
      const m = text.match(/theme (will be|is) (.*)/i);
      return { 
        subtitle: `Set theme to "${m?.[2] || "Planning"}".`, 
        newState: { theme: m?.[2] || "Planning", status: "planning" } 
      };
    }
    const screenMatch = input.match(/(members|registry|workspace|back)/);
    if (screenMatch) {
      const isMem = screenMatch[0].match(/members|registry/);
      return { 
        subtitle: isMem ? "Accessing registry." : "Returning to core.", 
        newState: { currentScreen: isMem ? "members" : "workspace" } 
      };
    }
    return { subtitle: "" };
  }

  async handleUiAction(action, val, state) {
    if (action === "login") { 
      // check if val is an ID string or a member object (for creation)
      if (typeof val === 'object') {
        login(val.id, val);
      } else {
        login(val); 
      }
      return { }; 
    }
    if (action === "logout") { logout(); return { }; }
    if (action === "CLEAR_LOGS") return { notification: "System logs cleared." };
    if (action === "RUN_DIAG") return { notification: "Diagnostics complete." };
    if (action === "DUMP_LOGS") return { notification: "Logs dumped to clipboard." };
    if (action === "TOGGLE_DEBUG") return { notification: `Kernel debugger ${val ? 'active' : 'idle'}.` };
    if (action === "ADD_MEMBER_REQUEST") return { notification: "Register members via Mission Control." };
    const flatKeys = ["theme", "date", "location", "room", "registrationLink", "mapUrl", "zoomLink", "wordOfTheDay", "wordDefinition"];
    if (flatKeys.includes(action)) return { notification: `${action} updated.`, newState: { [action]: val } };
    
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
    if (action === "addMember") {
      const next = [...state.members, val];
      return { notification: "New node synchronized.", newState: { members: next } };
    }
    if (action === "deleteMember") return { notification: "Node purged.", newState: { members: state.members.filter(m => m.id !== val) } };
    return { notification: "Action processed.", newState: { [action]: val } };
  }
}