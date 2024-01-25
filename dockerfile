FROM node:18

WORKDIR /app
# Copy package.json first to leverage Docker caching
COPY . ./app
RUN mkdir /app/.npm_cache
RUN export npm_config_cache=/app/.npm_cache

COPY package.json /app

RUN npm cache clean --force 
# Install npm dependencies
RUN npm install

RUN chown -R 1000920000:0 /app/.npm_cache

CMD ["npm", "run", "dev"]
