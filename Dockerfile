FROM mhart/alpine-node:6

ENV APP_DIR=/src/os-httpd
ENV NODE_ENV=production

# NPM package cache
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --production && \
    npm cache clean

RUN \
  mkdir -p ${APP_DIR} && \
  mkdir ${APP_DIR}/log && \
  cp -a /tmp/node_modules/ ${APP_DIR}

# Application setup
COPY config.js ${APP_DIR}/config.js
COPY index.js ${APP_DIR}/index.js

RUN addgroup www-data
RUN adduser -G www-data -D -H www-data
RUN chown -R www-data:www-data ${APP_DIR}

USER www-data

WORKDIR ${APP_DIR}

EXPOSE 5050

CMD ["node", "."]
