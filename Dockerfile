# Build stage for React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install Nginx to serve static files
RUN apk add --no-cache nginx

# Copy built frontend to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy backend files
COPY mock_agent ./mock_agent
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
