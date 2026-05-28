import { getMockIdentity, mockLogin, mockLogout } from './MockAuth';
import { transformIdentity } from './KeycloakIdentity';
import * as State from './KeycloakInstance';

export const isGuestMode = () => State.guestMode;
export const isConnectionDegraded = () => State.connectionDegraded;
export const setSyncErrorHandler = State.setSyncErrorHandler;

export const isAuthenticated = () => {
  if (State.USE_MOCK || State.guestMode) return !!getMockIdentity();
  return !!State.keycloak?.authenticated;
};

const safeInit = (onAuth) => {
  if (State.initFinished) return;
  State.setFinished(true);
  onAuth(true);
};

export const initKeycloak = (onAuth) => {
  if (State.initFinished) return onAuth(true);
  if (State.initStarted) return;
  State.setStarted(true);
  if (State.USE_MOCK || State.guestMode) return safeInit(onAuth);

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const timeoutMs = isLocal ? 45000 : 30000;

  const timer = setTimeout(() => {
    State.setGuestMode(true);
    State.setDegraded(true);
    if (State.onSyncError) State.onSyncError("CONNECTION TIMEOUT");
    safeInit(onAuth);
  }, timeoutMs);

  State.keycloak.init({ 
    onLoad: 'check-sso', pkceMethod: 'S256', enableLogging: true,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }).then(auth => {
    clearTimeout(timer);
    State.setFinished(true);
    onAuth(true);
  }).catch(err => {
    clearTimeout(timer);
    State.setGuestMode(true);
    State.setDegraded(true);
    safeInit(onAuth);
  });
};

export const getIdentity = () => (State.USE_MOCK || State.guestMode) 
  ? getMockIdentity() : transformIdentity(State.keycloak);

export const login = (d) => (State.USE_MOCK || State.guestMode) 
  ? mockLogin(null, d) : State.keycloak.login(d ? { loginHint: d.name || d } : {});

export const logout = () => (State.USE_MOCK || State.guestMode) 
  ? mockLogout() : State.keycloak.logout();

export default State.keycloak;

