# Lightweight Dockerfile for KCISLK Parents' Corner
# Multi-stage build optimized for public display service

# Stage 1: Dependencies and build
FROM node:22-slim AS builder

LABEL "language"="nodejs"
LABEL "framework"="next.js"
LABEL "service"="parents-corner"

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /src

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production --no-optional

# Copy source code
COPY . .

# Generate Prisma client without database connection
RUN npm run db:generate

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM node:22-slim AS runner

# Install OpenSSL for Prisma and curl for health checks
RUN apt-get update -y && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd --gid 1001 --system nodejs && \
    useradd --uid 1001 --system --gid nodejs --create-home --shell /bin/bash parentsapp

WORKDIR /src

# Change ownership of work directory
RUN chown -R parentsapp:nodejs /src

# Copy built application and dependencies with correct ownership
COPY --from=builder --chown=parentsapp:nodejs /src/package.json ./
COPY --from=builder --chown=parentsapp:nodejs /src/package-lock.json* ./
COPY --from=builder --chown=parentsapp:nodejs /src/.next ./.next
COPY --from=builder --chown=parentsapp:nodejs /src/public ./public
COPY --from=builder --chown=parentsapp:nodejs /src/prisma ./prisma
COPY --from=builder --chown=parentsapp:nodejs /src/node_modules ./node_modules

# Switch to non-root user
USER parentsapp

EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Runtime command - generate Prisma client and start
CMD ["sh", "-c", "npm run db:generate && npm run start"]