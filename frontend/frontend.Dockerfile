# syntax=docker/dockerfile:1

FROM node:16.19.0-bullseye-slim as builder
WORKDIR /toast

# Build react app
COPY toast/package.json .
RUN npm install
COPY toast .
RUN npm init @eslint/config
RUN ./node_modules/.bin/eslint --max-warnings=0 src
RUN CI=true npm run test
RUN npm run build

# copy react build to webserver share
FROM nginx
COPY --from=builder /toast/build /usr/share/nginx/html
