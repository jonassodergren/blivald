#FROM nginx:alpine
#RUN addgroup -S www && adduser -S www -G www
#COPY --chown=www:www . /usr/share/nginx/html
#USER www

FROM nginx:alpine
#COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
