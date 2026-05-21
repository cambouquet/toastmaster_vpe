import { handleMembers } from "./intentHandlers";
import { TestRunnerService } from "../system/TestRunnerService";

export class MockAiService {
  async processInput(text, state) {
    const input = text.toLowerCase();
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
    console.log(`UI:${action}`, val);
    const flatKeys = ["theme", "date", "location", "wordOfTheDay", "wordDefinition"];
    if (flatKeys.includes(action)) {
      return { subtitle: `${action} updated.`, newState: { [action]: val } };
    }
    if (action === "editMember") {
      const next = state.members.map(m => m.id === val.id ? { ...m, ...val.updates } : m);
      return { subtitle: "Registry updated.", newState: { members: next } };
    }
    if (action === "deleteMember") {
      const next = state.members.filter(m => m.id !== val);
      return { subtitle: "Node purged.", newState: { members: next } };
    }
    if (action.startsWith("roles.")) {
      const parts = action.split(".");
      if (parts[1] === "speaker") {
        const field = parts[2];
        const { id, val: newVal } = val;
        const nextSpeakers = state.roles.speakers.map(s => 
          s.id === id ? { ...s, [field]: newVal } : s
        );
        return { subtitle: "Speaker updated.", newState: { roles: { ...state.roles, speakers: nextSpeakers } } };
      }
      const role = parts[1];
      return { subtitle: `${role} updated.`, newState: { roles: { ...state.roles, [role]: val } } };
    }
    if (action === "RUN_TESTS") {
      TestRunnerService.runTests().then(res => {
        window.dispatchEvent(new CustomEvent('TEST_RESULT', { detail: res }));
      });
      return { subtitle: "SYSTEM_DIAGNOSTICS_RUNNING...", newState: { testStatus: 'RUNNING' } };
    }
    return { subtitle: "Done.", newState: { [action]: val } };
  }
}
