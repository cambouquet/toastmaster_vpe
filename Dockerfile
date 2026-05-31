# build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use cache mount for ultra-fast builds, and network resilience for cache misses
RUN --mount=type=cache,target=/root/.npm \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install
COPY . .

# Pass build args to env for Vite
ARG VITE_APP_ICON
ARG VITE_WING_COLOR
ARG VITE_APP_MODE
ENV VITE_APP_ICON=$VITE_APP_ICON
ENV VITE_WING_COLOR=$VITE_WING_COLOR
ENV VITE_APP_MODE=$VITE_APP_MODE

# CI Optimization: Build frontend once
RUN npm run build

# Stage 2: Production dependencies (Isolated from build artifacts)
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Restore cache mount and add network resilience
RUN --mount=type=cache,target=/root/.npm \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --omit=dev

# stage 3: final production image
FROM node:24-alpine
WORKDIR /app

# Ensure we have nginx.
# On the broken prod host, this might fail, but since we are using node:alpine,
# we at least have the node binary guaranteed. 
RUN sed -i 's/https/http/' /etc/apk/repositories && \
    (apk add --no-cache nginx || true)

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html/briefing
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/mock_agent ./mock_agent
COPY deploy/nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80 3001
RUN touch mock_agent/state_persistence.json && chmod 666 mock_agent/state_persistence.json
RUN printf "#!/bin/sh\nnginx -g 'daemon on;'\nnode mock_agent/server.cjs\n" > /app/start.sh && chmod +x /app/start.sh
CMD ["/app/start.sh"]
