# Project Setup

To initialize the neural link, execute the following commands in your host terminal.

## Prerequisites
- Node.js (Latest LTS)
- Podman or Docker (for Keycloak)

## Bootstrap
```powershell
# Clone the signal
git clone https://github.com/toastmaster-vpe/mission-control.git

# Install dependencies
npm install

# Setup environment
npm run setup

# Boot mission control
npm start
```

## Production Deployment
See the [Deployment Script](https://github.com/toastmaster-vpe/mission-control/blob/main/deploy.sh) for one-click staging.
