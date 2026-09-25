# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-bookworm-slim

FROM node:${NODE_VERSION} AS base
WORKDIR /opt/app
# Skip Puppeteer's own Chromium download; the runtime image installs the
# Debian `chromium` package instead (pulls its shared libs via apt).
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# ---- install all deps (incl. dev) for building the admin panel + TS ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- production-only deps, kept separate so the final image is lean ----
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- compile TS server code and build the admin panel ----
FROM deps AS build
ENV NODE_ENV=production
COPY . .
RUN npm run build

# ---- final runtime image ----
FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
WORKDIR /opt/app

# Chromium for Puppeteer-based PDF generation (see src/api/pdf/services/pdf.ts)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium ca-certificates fonts-liberation \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r strapi && useradd -r -g strapi -m strapi

COPY --from=prod-deps /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/package.json ./package.json
COPY --from=build /opt/app/favicon.png ./favicon.png
# `strapi start` checks for tsconfig.json to know it's a TS project and to
# resolve the compiled output dir (dist) — without it, it looks for config
# in the app root instead of dist/config and fails to boot.
COPY --from=build /opt/app/tsconfig.json ./tsconfig.json

RUN mkdir -p public/uploads && chown -R strapi:strapi /opt/app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]
