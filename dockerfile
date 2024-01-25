FROM node:18-alpine

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

# Set appropriate permissions for non-directory files, excluding node_modules
RUN find /home/node/app -type f ! -path '/home/node/app/node_modules*' -exec chmod 775 {} +

# Change ownership excluding the node_modules folder
RUN find /home/node/app -type d ! -path '/home/node/app/node_modules*' -exec chown 1000920000:0 {} +

CMD ["npm", "run", "dev"]
