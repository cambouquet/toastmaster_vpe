import * as State from './KeycloakInstance';

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

  const isLocal = window.location.origin.includes('localhost');
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
  }).then(() => {
    clearTimeout(timer);
    State.setFinished(true);
    onAuth(true);
  }).catch(() => {
    clearTimeout(timer);
    State.setGuestMode(true);
    State.setDegraded(true);
    safeInit(onAuth);
  });
};
