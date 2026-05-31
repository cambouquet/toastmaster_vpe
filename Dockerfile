# build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
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
RUN --mount=type=cache,target=/root/.npm npm install --omit=dev

# stage 3: final production image
FROM nginx:alpine
WORKDIR /app
# Install Node.js in the final stage (needed for mock_agent)
RUN apk add --no-cache nodejs
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html/briefing
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/mock_agent ./mock_agent
COPY deploy/nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80 3001
RUN touch mock_agent/state_persistence.json && chmod 666 mock_agent/state_persistence.json
RUN printf "#!/bin/sh\nnginx -g 'daemon on;'\n/usr/bin/node mock_agent/server.cjs\n" > /app/start.sh && chmod +x /app/start.sh
CMD ["/app/start.sh"]
