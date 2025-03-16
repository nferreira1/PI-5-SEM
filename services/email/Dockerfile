FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS build
COPY --from=dependencies /usr/src/app/node_modules node_modules
COPY . .
RUN bun run build

FROM base AS release
WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY package.json bun.lock ./

USER bun

ENTRYPOINT [ "bun", "run", "dist/index.js" ]
