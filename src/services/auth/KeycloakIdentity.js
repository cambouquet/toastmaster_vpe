export const transformIdentity = (keycloak) => {
  if (!keycloak?.authenticated) return null;
  const tp = keycloak.tokenParsed;
  const roles = tp?.realm_access?.roles || [];
  const isOrganizer = roles.includes('ORGANIZER') || roles.includes('admin');
  const isLeader = roles.includes('LEADER');
  
  return {
    id: tp?.sub,
    name: tp?.name || tp?.preferred_username || "AGENT",
    role: isOrganizer ? "ORGANIZER" : "PARTICIPANT",
    title: isLeader ? "LEAD HOST" : (isOrganizer ? "EDUCATION LEAD" : "PARTICIPANT"),
    token: keycloak.token
  };
};
