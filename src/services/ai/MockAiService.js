export class MockAiService {
  async processInput(text, state) {
    const input = text.toLowerCase();
    
    if (input.includes('add member')) {
      const name = text.replace(/.*add member\s+/i, '').trim();
      if (!name) return { subtitle: "Please specify a name." };
      const newMember = {
        id: Date.now().toString(),
        name,
        pathway: 'DYNAMIC_LEADERSHIP',
        level: 1,
        status: 'ONLINE'
      };
      return {
        subtitle: `Syncing "${name}" to member registry...`,
        newState: { members: [...state.members, newMember] }
      };
    }

    if (input.includes('delete member') || input.includes('remove member')) {
      const name = text.replace(/.*(delete|remove) member\s+/i, '').trim();
      const nextMembers = state.members.filter(m => 
        !m.name.toLowerCase().includes(name.toLowerCase())
      );
      return {
        subtitle: `Node "${name}" purged from registry.`,
        newState: { members: nextMembers }
      };
    }

    if (input.includes('theme')) {
      const themeMatch = text.match(/theme (will be|is) (.*)/i);
      const theme = themeMatch ? themeMatch[2] : "Planning";
      return { 
        subtitle: `Set theme to "${theme}". Let's fill the roles now.`,
        newState: { theme, status: 'planning' }
      };
    }

    if (input.includes('members') || input.includes('registry')) {
      return {
        subtitle: "Accessing encrypted member registry...",
        newState: { currentScreen: 'members' }
      };
    }

    if (input.includes('workspace') || input.includes('back')) {
      return {
        subtitle: "Returning to workspace core.",
        newState: { currentScreen: 'workspace' }
      };
    }

    return { subtitle: `Processing: ${text}` };
  }

  async handleUiAction(action, value, state) {
    if (action === 'editMember') {
      const next = state.members.map(m => 
        m.id === value.id ? { ...m, ...value.updates } : m
      );
      return { 
        subtitle: `Registry updated: ${value.updates.name || 'Member details'}`, 
        newState: { members: next } 
      };
    }
    if (action === 'deleteMember') {
      const next = state.members.filter(m => m.id !== value);
      return { 
        subtitle: "Node purged from registry.", 
        newState: { members: next } 
      };
    }

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
