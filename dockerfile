FROM node:18-alpine

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN chmod -R 775 /home/node/app
RUN chown -R 1000920000:0 /home/node/app/.npm


CMD ["npm", "run", "dev"]
