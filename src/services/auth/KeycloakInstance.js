import Keycloak from 'keycloak-js';

export const USE_MOCK = false;
export let guestMode = false;
export let keycloak = null;
export let connectionDegraded = false;
export let initStarted = false;
export let initFinished = false;
export let onSyncError = null;

export const setGuestMode = (v) => { guestMode = v; };
export const setDegraded = (v) => { connectionDegraded = v; };
export const setStarted = (v) => { initStarted = v; };
export const setFinished = (v) => { initFinished = v; };
export const setSyncErrorHandler = (h) => { onSyncError = h; };

try {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const kcUrl = import.meta.env.PROD ? 'https://auth.k-app.tech' : `http://${currentHost}:8081`;

  keycloak = !USE_MOCK ? new Keycloak({
    url: kcUrl,
    realm: 'k', clientId: 'k-app'
  }) : null;
} catch (e) { guestMode = true; connectionDegraded = true; }
