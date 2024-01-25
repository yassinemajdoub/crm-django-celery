FROM node:18

USER root

WORKDIR /app
# Copy package.json first to leverage Docker caching
COPY . ./app

COPY package.json /app

RUN npm cache clean --force 
# Install npm dependencies
RUN npm install

RUN chown -R 1000920000:0 "/.npm"

CMD ["npm", "run", "dev"]
