# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.29
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL bun_version="${BUN_VERSION}"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# Copy the rest of the application code
COPY --link . .

# Expose the port that the server will run on
EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
CMD [ "bun", "run", "start" ]
