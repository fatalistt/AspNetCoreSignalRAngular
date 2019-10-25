FROM node:alpine AS base
WORKDIR /app

FROM base as prepare
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

FROM prepare AS debug
EXPOSE 80
CMD npx ng serve --host 0.0.0.0 --port 80 --poll 1000

FROM prepare AS build
RUN npx ng build --prod 

FROM nginx:alpine as release
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD nginx -g "daemon off;"