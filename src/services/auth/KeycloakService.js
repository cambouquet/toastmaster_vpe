import Keycloak from 'keycloak-js';
import { getMockIdentity, mockLogin, mockLogout } from './MockAuth';

const USE_MOCK = false;
let guestMode = false;
let keycloak = null;
let connectionDegraded = false;
let initStarted = false;
let initFinished = false;
let onSyncError = null;

try {
  keycloak = !USE_MOCK ? new Keycloak({
    url: import.meta.env.PROD ? 'https://auth.k-app.tech' : 'http://localhost:8081',
    realm: 'toastmaster', clientId: 'mission-control'
  }) : null;
} catch (e) { guestMode = true; connectionDegraded = true; }

export const isGuestMode = () => guestMode;
export const isConnectionDegraded = () => connectionDegraded;
export const setSyncErrorHandler = (handler) => { onSyncError = handler; };

export const initKeycloak = (onAuth) => {
  if (initFinished) return onAuth(true);
  if (initStarted) return; // Wait for the first one to finish
  initStarted = true;

  if (USE_MOCK || guestMode) {
    initFinished = true;
    return onAuth(true);
  }

  const safeInit = () => {
    if (initFinished) return;
    initFinished = true;
    onAuth(true);
  };

  // Safety timeout: local Keycloak takes ~30-40s to boot on Windows/Podman.
  // We wait longer locally to avoid falling into guest mode prematurely.
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const timeoutMs = isLocal ? 45000 : 8000;

  const timer = setTimeout(() => {
    console.warn(`Keycloak init timeout [${timeoutMs}ms] - falling back to guest mode`);
    if (onSyncError) onSyncError("CONNECTION TIMEOUT - RUNNING IN OFFLINE MODE");
    guestMode = true;
    connectionDegraded = true;
    safeInit();
  }, timeoutMs);

  keycloak.init({ 
    onLoad: 'check-sso', 
    pkceMethod: 'S256',
    enableLogging: true,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }).then((authenticated) => {
    clearTimeout(timer);
    console.log(`[KEYCLOAK] Handshake successful. Auth: ${authenticated}`);
    initFinished = true;
    onAuth(true);
  }).catch(err => {
    clearTimeout(timer);
    console.error("Keycloak init error:", err);
    if (onSyncError) onSyncError("CONNECTION REFUSED - RUNNING IN OFFLINE MODE");
    guestMode = true;
    connectionDegraded = true;
    safeInit();
  });
};

export const getIdentity = () => {
  if (USE_MOCK || guestMode) return getMockIdentity();
  if (!keycloak?.authenticated) return null;
  
  const tp = keycloak.tokenParsed;
  const roles = tp?.realm_access?.roles || [];
  const isVpe = roles.includes('VPE') || roles.includes('admin');
  const isPresident = roles.includes('PRESIDENT');
  
  return {
    id: tp?.sub,
    name: tp?.name || tp?.preferred_username || "AGENT",
    role: isVpe ? "VPE" : "MEMBER",
    title: isPresident ? "PRESIDENT" : (isVpe ? "VP EDUCATION" : "MEMBER"),
    token: keycloak.token
  };
};

export const login = (id, data) => (USE_MOCK || guestMode) ? mockLogin(id, data) : keycloak.login();
export const logout = () => (USE_MOCK || guestMode) ? mockLogout() : keycloak.logout();

export default keycloak;
