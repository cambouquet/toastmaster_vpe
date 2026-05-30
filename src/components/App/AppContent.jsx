import React from 'react';
import { SplashScreen } from '../Shell/SplashScreen';
import { Shell } from '../Shell/Shell';
import { isAuthenticated } from '../../services/auth/KeycloakService';

export const AppContent = ({ authReady, loading, handleFinish }) => {
  if (!authReady || loading) {
    return (
      <SplashScreen 
        onFinish={handleFinish} 
        isLoggingIn={isAuthenticated()} 
      />
    );
  }
  return <Shell />;
};
