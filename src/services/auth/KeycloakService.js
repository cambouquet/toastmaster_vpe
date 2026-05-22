import Keycloak from 'keycloak-js';

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
    if (isLoggedOut) {
      return { name: "Guest", role: "NONE" };
    }
    return {
      name: "Dev Admin",
      role: "ADMIN",
      title: "SYSTEM ARCHITECT",
      token: "mock-token"
    };
  }

  if (!keycloak || !keycloak.authenticated) return { name: "Guest", role: "NONE" };
  
  const name = keycloak.tokenParsed?.preferred_username || "User";
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isVpe = roles.includes('VPE') || roles.includes('admin');
  
  return {
    name,
    role: isVpe ? "VPE" : "MEMBER",
    token: keycloak.token
  };
};

export const login = () => {
  if (USE_MOCK) {
    localStorage.removeItem('mock_logged_out');
    window.location.reload();
  } else keycloak.login();
};

export const logout = () => {
  if (USE_MOCK) {
    localStorage.setItem('mock_logged_out', 'true');
    sessionStorage.setItem('pending_notification', 'Mock Session Terminated. Returning to Guest state.');
    window.location.reload();
  } else keycloak.logout();
};

export default keycloak;
