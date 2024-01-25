FROM node:18-alpine

# Create a non-root user
RUN adduser -u 1000920000 -G root -s /bin/sh -D nodeuser

COPY . /home/node/app
WORKDIR /home/node/app

ENV NPM_CONFIG_CACHE=/home/node/app/.npm_cache

RUN mkdir /home/node/app/.npm_cache \
    && chown -R 1000920000:0 /home/node/app/.npm_cache

USER nodeuser

RUN npm install

CMD ["npm", "run", "dev"]
