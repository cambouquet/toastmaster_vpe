import { handleMembers } from "./intentHandlers";
import { AgentService } from "./AgentService";
import { login, logout } from "../auth/KeycloakService";
import { handleUiActions } from "./MockAiActions";

export class MockAiService {
  login() { login(); }
  logout() { logout(); }

  async processInput(text, state, onStream) {
    const input = text.toLowerCase();
    if (input === "login") { login(); return {}; }
    if (input === "logout") { logout(); return {}; }
    if (input.includes("agent") || input.includes("connect")) {
      return AgentService.streamFromMockAgent(text, onStream);
    }
    const res = handleMembers(input, text, state);
    if (res) return res;
    if (input.includes("theme")) {
      const m = text.match(/theme (will be|is) (.*)/i);
      return { subtitle: `Set theme to "${m?.[2] || "Planning"}".`, newState: { theme: m?.[2] || "Planning", status: "planning" } };
    }
    const m = input.match(/(members|registry|workspace|back)/);
    if (m) {
      const isMem = m[0].match(/members|registry/);
      return { subtitle: isMem ? "Accessing registry." : "Returning to core.", newState: { currentScreen: isMem ? "members" : "workspace" } };
    }
    return { subtitle: "" };
  }

  async handleUiAction(action, val, state) {
    return handleUiActions(action, val, state);
  }
}