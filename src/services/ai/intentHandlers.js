export const handleMembers = (input, text, state) => {
  if (input.includes('add member')) {
    const name = text.replace(/.*add member\s+/i, '').trim();
    return name ? {
      subtitle: `Syncing "${name}" to member registry...`,
      newState: { members: [...state.members, { id: Date.now().toString(), name, pathways: [], level: 1, status: 'ONLINE' }] }
    } : { subtitle: "Please specify a name." };
  }
  if (input.includes('delete member') || input.includes('remove member')) {
    const name = text.replace(/.*(delete|remove) member\s+/i, '').trim();
    return {
      subtitle: `Node "${name}" purged from registry.`,
      newState: { members: state.members.filter(m => !m.name.toLowerCase().includes(name.toLowerCase())) }
    };
  }
  return null;
};
