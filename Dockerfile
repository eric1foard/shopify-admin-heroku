FROM node:8-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

RUN mkdir client server config bin
COPY client ./client
COPY server ./server
COPY config ./config
COPY bin ./bin

COPY .babelrc .
RUN yarn build

EXPOSE 8080
CMD ["yarn", "start"]