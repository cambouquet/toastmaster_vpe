# Build stage for React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use build cache for npm modules
RUN --mount=type=cache,target=/root/.npm \
    npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache nginx psmisc
COPY --from=build /app/dist /usr/share/nginx/html
COPY mock_agent ./mock_agent
# Install production-only backend deps if needed
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --omit=dev
CMD ["npm", "run", "start"]

COPY package*.json ./
RUN npm install --production

# Nginx config
COPY deploy/nginx.conf /etc/nginx/http.d/default.conf

# Expose ports
EXPOSE 80 3001

# Start script
RUN echo "#!/bin/sh" > /app/start.sh && \
    echo "nginx -g 'daemon on;' || exit 1" >> /app/start.sh && \
    echo "node mock_agent/server.cjs" >> /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
