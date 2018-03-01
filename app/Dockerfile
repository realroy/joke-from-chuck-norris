FROM keymetrics/pm2:latest-alpine
RUN npm install pm2 -g
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i
EXPOSE 5555