FROM node:lts as build-stage

# WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN npm install -g pnpm

RUN pnpm install

COPY . ./

RUN pnpm build

FROM nginx as prod-stage

COPY --from=build-stage /dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf