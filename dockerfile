FROM node:7.4-alpine

RUN adduser node root
COPY . /home/node/app
WORKDIR /home/node/app

RUN yarn install 

RUN chmod -R 775 /home/node/app
RUN chown -R node:root /home/node/app


USER 1000

CMD ["yarn", "run", "dev"]
