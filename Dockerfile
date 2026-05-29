# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN npm run build && npm prune --production

# Final stage
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html/briefing
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/mock_agent ./mock_agent
COPY deploy/nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80 3001
RUN touch mock_agent/state_persistence.json && chmod 666 mock_agent/state_persistence.json
RUN printf "#!/bin/sh\nnginx -g 'daemon on;'\nnode mock_agent/server.cjs\n" > /app/start.sh && chmod +x /app/start.sh
CMD ["/app/start.sh"]
