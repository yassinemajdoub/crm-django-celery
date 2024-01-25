FROM node:18

WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker caching
COPY package.json /app/

# Install dependencies using yarn
RUN yarn install

# Set the container to run as root temporarily to change ownership
USER root

CMD ["yarn", "run", "dev"]
