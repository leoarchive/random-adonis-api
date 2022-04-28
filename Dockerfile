FROM node:17

WORKDIR /home/api

COPY package.json .
COPY yarn.lock .

RUN yarn install 

COPY . .

CMD node ace serve --watch