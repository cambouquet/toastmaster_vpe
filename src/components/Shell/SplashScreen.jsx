import React from 'react';
import { AppLoadingScreen } from './AppLoadingScreen';
import './SplashScreen.scss';

export const SplashScreen = ({ onFinish }) => {
  return (
    <div className="splash-overlay-wrapper">
      <AppLoadingScreen app="toastmaster" onFinish={onFinish} isInitial={true} />
    </div>
  );
};
