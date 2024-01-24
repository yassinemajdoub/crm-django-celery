FROM node:18

WORKDIR /app

COPY package.json ./

# Switch to a non-root user to avoid permission issues
USER node

RUN npm install

# Set proper permissions for npm cache directory
RUN mkdir /.npm && chown -R node:node /.npm

COPY . .

CMD ["npm", "run", "dev"]
