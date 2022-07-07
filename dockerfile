FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Reset prepare script of npm to avoid install husky since it's dev-dependency & we don't have it here
RUN npm set-script prepare ""

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
