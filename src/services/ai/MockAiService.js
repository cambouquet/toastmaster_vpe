import { handleMembers } from "./intentHandlers";
import { AgentService } from "./AgentService";

export class MockAiService {
  async processInput(text, state, onStream) {
    const input = text.toLowerCase();
    
    if (input.includes("login as ") || input === "logout") {
      const name = input === "logout" ? "guest" : text.split(/login as /i)[1].trim();
      const isGuest = name.toLowerCase() === "guest";
      const isVpe = !isGuest && (name.toLowerCase().includes("vpe") || name.toLowerCase().includes("president"));
      
      return {
        subtitle: isGuest ? "Identity cleared. Access restricted." : `Identity verified: ${name}.`,
        newState: { currentUser: { name: isGuest ? "Guest" : name, role: isGuest ? "NONE" : (isVpe ? "VPE" : "MEMBER") } }
      };
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
    const flatKeys = ["theme", "date", "location", "room", "registrationLink", "mapUrl", "zoomLink", "wordOfTheDay", "wordDefinition"];
    if (flatKeys.includes(action)) return { subtitle: `${action} updated.`, newState: { [action]: val } };
    
    if (action.startsWith('roles.')) {
      const parts = action.split('.');
      if (parts[1] === 'speaker') {
        const field = parts[2];
        const next = state.roles.speakers.map(s => s.id === val.id ? { ...s, [field]: val.val } : s);
        return { subtitle: `Speaker updated.`, newState: { roles: { speakers: next } } };
      }
      return { subtitle: `${parts[1]} assigned.`, newState: { roles: { [parts[1]]: val } } };
    }

    if (action === "editMember") {
      const next = state.members.map(m => m.id === val.id ? { ...m, ...val.updates } : m);
      return { subtitle: "Registry updated.", newState: { members: next } };
    }
    if (action === "deleteMember") return { subtitle: "Node purged.", newState: { members: state.members.filter(m => m.id !== val) } };
    return { subtitle: "Action processed.", newState: { [action]: val } };
  }
}