FROM node:14.19.1-stretch-slim
WORKDIR /srv/app
COPY . .
COPY docker/entrypoint.sh /srv/app
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn install --frozen-lockfile && yarn build
EXPOSE 3000
