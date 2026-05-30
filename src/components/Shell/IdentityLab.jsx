import React, { useEffect } from 'react';
import { login } from '../../services/auth/KeycloakService';

export const IdentityLab = ({ state }) => {
  useEffect(() => {
    // Identity Lab screen is now just a gateway to the Keycloak login screen.
    // If the user reaches this component while not authenticated, redirect immediately.
    if (!state.currentUser) {
      login();
    }
  }, [state.currentUser]);

  return (
    <div className='workspace-screen identity-lab guest-mode'>
      <div className='uplink-bootstrap'>
        <div className='sync-success'>
          <div className='success-text'>REDIRECTING TO SECURE AUTH...</div>
          <div className='loading-spinner-placeholder' />
        </div>
      </div>
    </div>
  );
};
