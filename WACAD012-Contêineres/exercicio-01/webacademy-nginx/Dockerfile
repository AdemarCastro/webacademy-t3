FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y nginx

COPY default /etc/nginx/sites-available/default
COPY index.html /usr/share/nginx/html

EXPOSE 7000

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]