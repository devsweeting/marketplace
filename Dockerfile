FROM node:14.19.1-stretch-slim
WORKDIR /srv/app
COPY . .
COPY docker/entrypoint.sh /srv/app
RUN yarn install && yarn build
EXPOSE 3000
