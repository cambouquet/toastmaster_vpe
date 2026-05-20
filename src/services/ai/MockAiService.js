export class MockAiService {
  async processInput(text) {
    const input = text.toLowerCase();
    if (input.includes('theme')) {
      const themeMatch = text.match(/theme (will be|is) (.*)/i);
      const theme = themeMatch ? themeMatch[2] : "Planning";
      return { 
        subtitle: `Set theme to "${theme}". Let's fill the roles now.`,
        newState: { theme, status: 'planning' }
      };
    }
    return { subtitle: `Processing: ${text}` };
  }

  async handleUiAction(action, value) {
    if (action === 'theme') {
      return { 
        subtitle: `Got it. The theme is now set to ${value}.`, 
        newState: { theme: value } 
      };
    }
    
    if (action.startsWith('roles.')) {
      const role = action.split('.')[1];
      const roleName = role.charAt(0).toUpperCase() + role.slice(1);
      return {
        subtitle: `${roleName} assigned to ${value}. Excellent choice.`,
        newState: { roles: { [role]: value } }
      };
    }

    return { subtitle: `Updated ${action}`, newState: { [action]: value } };
  }
}
