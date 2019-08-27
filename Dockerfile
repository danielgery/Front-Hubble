# Copy code
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
# COPY server.crt /certs/server.crt
# COPY server.key /certs/server.key
# COPY ssl.pass /certs/ssl.pass

WORKDIR /usr/share/nginx/html
COPY dist/ .
