import { handleMembers } from "./intentHandlers";
import { AgentService } from "./AgentService";

export class MockAiService {
  async processInput(text, state, onStream) {
    const input = text.toLowerCase();
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
    if (action === "editMember") {
      const next = state.members.map(m => m.id === val.id ? { ...m, ...val.updates } : m);
      return { subtitle: "Registry updated.", newState: { members: next } };
    }
    if (action === "deleteMember") return { subtitle: "Node purged.", newState: { members: state.members.filter(m => m.id !== val) } };
    return { subtitle: "Action processed.", newState: { [action]: val } };
  }
}