FROM node:20-alpine
WORKDIR /usr/app
RUN apk add curl
COPY package.json package-lock.json ./
RUN npm run build
RUN npm ci
ADD . .
EXPOSE 80
CMD node ./dist/index.js