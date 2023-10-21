FROM nginx:latest

RUN apk add curl
COPY package.json package-lock.json ./
RUN npm run build
RUN npm ci
ADD . .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]WORKDIR /usr/app
# CMD node ./dist/index.js