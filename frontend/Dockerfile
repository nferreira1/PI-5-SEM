FROM oven/bun:1 AS build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY . .

RUN VITE_API_URL=${VITE_API_URL} bun install --frozen-lockfile && \
    VITE_API_URL=${VITE_API_URL} bun run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
