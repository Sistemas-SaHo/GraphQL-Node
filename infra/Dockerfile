FROM node:24.10.0-alpine3.22 AS deps

WORKDIR /app
COPY package*.json .
RUN npm install

FROM node:24.10.0-alpine3.22 AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.10.0-alpine3.22 AS prod
WORKDIR /app
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=builder /app/build ./build
COPY .env .env
RUN chown -R node:node /app
EXPOSE 3000
USER node
CMD [ "node", "build/index.js" ]