FROM node:18

COPY . ./app
WORKDIR /app
RUN npm config set registry https://registry.npmjs.org/

RUN npm config set proxy null
RUN npm config set https-proxy null

RUN npm prune
RUN npm install --quiet

EXPOSE 8080

ENV NODE_ENV=production

ENTRYPOINT ["npm", "run", "start"]