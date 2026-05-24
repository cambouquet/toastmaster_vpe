import Keycloak from 'keycloak-js';
import { getMockIdentity, mockLogin, mockLogout } from './MockAuth';

const USE_MOCK = true;

const keycloak = !USE_MOCK ? new Keycloak({
  url: 'http://localhost:8080', realm: 'toastmaster', clientId: 'mission-control',
}) : null;

export const initKeycloak = (onAuthenticated) => {
  if (USE_MOCK) return onAuthenticated(true);
  keycloak.init({ 
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256'
  }).then(onAuthenticated).catch(e => onAuthenticated(false));
};

export const getIdentity = () => {
  if (USE_MOCK) return getMockIdentity();
  if (!keycloak || !keycloak.authenticated) return { name: "AUTHORIZATION_REQUIRED", role: "NONE" };
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isVpe = roles.includes('VPE') || roles.includes('admin');
  return {
    name: keycloak.tokenParsed?.preferred_username || "User",
    role: isVpe ? "VPE" : "MEMBER",
    token: keycloak.token
  };
};

export const login = (memberId = '0', data = null) => {
  if (USE_MOCK) mockLogin(memberId, data);
  else keycloak.login();
};

export const logout = () => {
  if (USE_MOCK) mockLogout();
  else keycloak.logout();
};

export default keycloak;
