# Multi-stage build for production

# Stage 1: Build client
FROM node:20-alpine AS client-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# Stage 2: Setup server
FROM node:20-alpine AS server-builder

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

# Stage 3: Production
FROM node:20-alpine

WORKDIR /app

# Copy server files
COPY --from=server-builder /app/server ./server

# Copy built client files
COPY --from=client-builder /app/client/dist ./client/dist

# Set working directory to server
WORKDIR /app/server

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:9000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "index.js"]
