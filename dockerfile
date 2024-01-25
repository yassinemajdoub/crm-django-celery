FROM node:18-alpine

COPY . /home/node/app
WORKDIR /home/node/app

ENV NPM_CONFIG_CACHE=/home/node/app/.npm_cache

RUN mkdir /home/node/app/.npm_cache

RUN npm install

RUN chmod -R 775 /home/node/app
# RUN chown -R 1000920000:0 /home/node/app/.npm_cache

# Use a command to keep the container running
CMD tail -f /dev/null
