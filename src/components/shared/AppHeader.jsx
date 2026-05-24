import React from 'react';
import './AppHeader.scss';

export const AppHeader = ({ app, title, children }) => (
  <header className="registry-header">
    <div className="app-id-tag">
      <span className="tag-prefix">APP_ID</span>
      <span className="tag-val">{app.toUpperCase()}</span>
    </div>
    <div className="header-main">
      <h1 className="glitch-text" data-text={title.toUpperCase()}>
        {title.toUpperCase()}
      </h1>
      {children}
    </div>
  </header>
);