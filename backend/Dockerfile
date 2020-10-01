FROM alpine:3.12

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY . .

RUN npm ci

CMD ["npm", "start"]