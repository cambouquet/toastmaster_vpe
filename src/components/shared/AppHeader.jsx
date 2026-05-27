import React from 'react';
import './AppHeader.scss';

export const AppHeader = ({ title, status, children }) => (
  <header className={`registry-header ${status === 'live' ? 'is-live' : ''}`}>
    <div className="header-main">
      <h1 className="glitch-text" data-text={title.toUpperCase()}>
        {title.toUpperCase()}
      </h1>
      {children}
    </div>
  </header>
);