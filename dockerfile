FROM node:18-alpine

RUN adduser node root
COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN chmod -R 775 /home/node/app
RUN chown -R node:root /home/node/app

USER 1000

CMD ["npm", "run", "dev"]
