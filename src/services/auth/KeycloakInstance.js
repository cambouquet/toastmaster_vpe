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
  keycloak = !USE_MOCK ? new Keycloak({
    url: import.meta.env.PROD ? 'https://auth.k-app.tech' : 'http://localhost:8081',
    realm: 'k', clientId: 'k-app'
  }) : null;
} catch (e) { guestMode = true; connectionDegraded = true; }
