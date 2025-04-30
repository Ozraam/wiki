FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

# Copy all project files
COPY . .

# Build the app
RUN bun --bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/build ./

# Only install production dependencies
RUN bun install
RUN bun install clsx

# Expose the port your app runs on
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["bun", "index.js"]
