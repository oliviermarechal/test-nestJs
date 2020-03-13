FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install -g @nestjs/cli
