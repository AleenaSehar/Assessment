# Stage 1: Build the frontend
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (copy only package files first for caching)
COPY package*.json ./
# If you use yarn, change to COPY yarn.lock and run yarn install
RUN npm ci --only=production || npm install

# Copy source and build
COPY . .
# If your build script outputs to 'build' change accordingly
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine
# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: copy a custom nginx.conf if you need history pushState routing (React Router)
# Uncomment and provide a nginx.conf file in repo root if used
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
# Use a simple healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
