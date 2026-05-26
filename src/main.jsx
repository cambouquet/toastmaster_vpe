import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initKeycloak } from './services/auth/KeycloakService'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
