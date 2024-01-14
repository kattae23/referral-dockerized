FROM node:18.17.1-alpine as build

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:latest

COPY --from=build /app/dist/referral-fe/ /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]