FROM nginx:alpine

USER root

RUN rm -rf /usr/share/nginx/html/*

COPY build/ /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d && \
  chown -R nginx:nginx /usr/share/nginx

RUN mkdir /etc/nginx/pid && chown -R nginx:nginx /etc/nginx/pid

COPY nginx/nginx.conf /etc/nginx/nginx.conf

USER nginx

EXPOSE 5000

ENTRYPOINT ["nginx", "-g", "daemon off;"]