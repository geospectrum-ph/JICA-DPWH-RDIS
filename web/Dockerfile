FROM node:20.11.1-slim

ENV NODE_ENV development

WORKDIR /app
RUN apt -y update && apt install -y netcat-traditional

COPY package.json /app
RUN npm install

COPY . .

CMD exec @