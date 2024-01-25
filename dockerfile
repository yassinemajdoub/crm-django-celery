FROM node:18-alpine

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN chmod -R 775 /home/node/app
RUN chown 1000920000:0 /home/node/app

CMD ["npm", "run", "dev"]
