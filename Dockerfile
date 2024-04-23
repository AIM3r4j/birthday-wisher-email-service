FROM node:18-alpine AS development

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install
RUN npm install webpack
#RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

#RUN npm install
RUN npm install webpack
RUN npm install --only=production

COPY .env.example .env
COPY ssl ./ssl
COPY locales ./locales

COPY --from=development /app/dist ./dist
EXPOSE 5001

CMD ["node", "dist/main"]
