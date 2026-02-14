FROM node:20-alpine AS build-stage

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build


FROM nginxinc/nginx-unprivileged:alpine

COPY --from=build-stage --chown=nginx:nginx /app/dist /usr/share/nginx/html
EXPOSE 8080