import { getMockIdentity, mockLogin, mockLogout } from './MockAuth';
import { transformIdentity } from './KeycloakIdentity';
import * as State from './KeycloakInstance';
import { initKeycloak } from './KeycloakInit';

export { initKeycloak };

export const isGuestMode = () => State.guestMode;
export const isConnectionDegraded = () => State.connectionDegraded;
export const setSyncErrorHandler = State.setSyncErrorHandler;

export const isAuthenticated = () => {
  if (State.USE_MOCK || State.guestMode) return !!getMockIdentity();
  return !!State.keycloak?.authenticated;
};

export const getIdentity = () => (State.USE_MOCK || State.guestMode) 
  ? getMockIdentity() : transformIdentity(State.keycloak);

export const login = (d) => (State.USE_MOCK || State.guestMode) 
  ? mockLogin(null, d) : State.keycloak.login(d ? { loginHint: d.name || d } : {});

export const logout = () => (State.USE_MOCK || State.guestMode) 
  ? mockLogout() : State.keycloak.logout();

export default State.keycloak;


