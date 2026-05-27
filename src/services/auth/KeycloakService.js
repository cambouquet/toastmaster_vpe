import Keycloak from 'keycloak-js';
import { getMockIdentity, mockLogin, mockLogout } from './MockAuth';

const USE_MOCK = false;
let guestMode = false;
let keycloak = null;

try {
  keycloak = !USE_MOCK ? new Keycloak({
    url: import.meta.env.PROD ? 'https://auth.k-app.tech' : 'http://localhost:8080',
    realm: 'toastmaster', clientId: 'mission-control'
  }) : null;
} catch (e) { guestMode = true; }

export const initKeycloak = (onAuth) => {
  if (USE_MOCK || guestMode) return onAuth(true);
  keycloak.init({ 
    onLoad: 'check-sso', pkceMethod: 'S256',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }).then(() => onAuth(true)).catch(e => {
    console.warn("Keycloak failed, guest mode active", e);
    guestMode = true; 
    onAuth(true);
  });
};

export const getIdentity = () => {
  if (USE_MOCK || guestMode) return getMockIdentity();
  if (!keycloak?.authenticated) return { name: "GUEST", role: "GUEST" };
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isVpe = roles.includes('VPE') || roles.includes('admin');
  return {
    name: keycloak.tokenParsed?.preferred_username || "User",
    role: isVpe ? "VPE" : "MEMBER",
    token: keycloak.token
  };
};

export const login = (id, data) => (USE_MOCK || guestMode) ? mockLogin(id, data) : keycloak.login();
export const logout = () => (USE_MOCK || guestMode) ? mockLogout() : keycloak.logout();

export default keycloak;
