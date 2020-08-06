FROM alpine:3.12

RUN apk add --update nodejs npm

RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN npm ci

CMD ["npm", "start"]