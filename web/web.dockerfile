FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3001

CMD ["npm", "run", "start"]