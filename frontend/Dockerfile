FROM node:18 AS BUILD

RUN mkdir "app"

WORKDIR /app

COPY ./ ./

RUN npm i -y

RUN npm run build



FROM nginx:latest

COPY --from=BUILD ./app /usr/share/nginx/html/

COPY --from=BUILD ./app/dist /usr/share/nginx/html/

COPY --from=BUILD ./app/nginx.conf /etc/nginx/conf.d/nginx.conf

CMD [ "nginx", "-g", "daemon off;" ]



