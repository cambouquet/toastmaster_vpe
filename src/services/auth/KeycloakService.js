import Keycloak from 'keycloak-js';
import { MEMBERS_DATA } from '../../data/members';

const USE_MOCK = true; // Switch to false once Podman/Keycloak is ready

const keycloak = !USE_MOCK ? new Keycloak({
  url: 'http://localhost:8080',
  realm: 'toastmaster',
  clientId: 'mission-control',
}) : null;

export const initKeycloak = (onAuthenticated) => {
  if (USE_MOCK) {
    console.log("Auth: Using Mock Mode (Dev)");
    onAuthenticated(true);
    return;
  }
  keycloak.init({ 
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256'
  })
    .then((authenticated) => {
      onAuthenticated(authenticated);
    })
    .catch((err) => {
      console.error("Keycloak Init Error:", err);
      onAuthenticated(false);
    });
};

export const getIdentity = () => {
  if (USE_MOCK) {
    const isLoggedOut = localStorage.getItem('mock_logged_out') === 'true';
    if (isLoggedOut) return { name: "AUTHORIZATION_REQUIRED", role: "NONE" };
    
    const memberId = localStorage.getItem('mock_member_id');
    if (!memberId) return { name: "AUTHORIZATION_REQUIRED", role: "NONE" };

    const extraMembers = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
    const allMembers = [...MEMBERS_DATA, ...extraMembers];
    const member = allMembers.find(m => m.id === memberId);

    if (!member) return { name: "AUTHORIZATION_REQUIRED", role: "NONE" };

    return {
      name: member.name,
      role: member.role,
      title: member.title,
      token: "mock-token"
    };
  }

  if (!keycloak || !keycloak.authenticated) return { name: "AUTHORIZATION_REQUIRED", role: "NONE" };
  
  const name = keycloak.tokenParsed?.preferred_username || "User";
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isVpe = roles.includes('VPE') || roles.includes('admin');
  
  return {
    name,
    role: isVpe ? "VPE" : "MEMBER",
    token: keycloak.token
  };
};

export const login = (memberId = '0', newMemberData = null) => {
  if (USE_MOCK) {
    let memberName = 'Unknown';
    if (newMemberData) {
      // Temporary persistence for the "new" member during this session's reload
      const sessionMembers = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
      sessionMembers.push(newMemberData);
      sessionStorage.setItem('mock_extra_members', JSON.stringify(sessionMembers));
      memberName = newMemberData.name;
    } else {
      const allMembers = [...MEMBERS_DATA, ...JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]')];
      const member = allMembers.find(m => m.id === memberId) || MEMBERS_DATA[0];
      memberName = member.name;
    }
    
    localStorage.removeItem('mock_logged_out');
    localStorage.setItem('mock_member_id', memberId);
    sessionStorage.setItem('pending_notification', `Uplink established. Identified as ${memberName}.`);
    window.location.reload();
  } else keycloak.login();
};

export const logout = () => {
  if (USE_MOCK) {
    localStorage.setItem('mock_logged_out', 'true');
    localStorage.removeItem('mock_member_id');
    localStorage.removeItem('mock_user_role');
    sessionStorage.setItem('pending_notification', 'Connection terminated. Rest well, user.');
    window.location.reload();
  } else keycloak.logout();
};

export default keycloak;
