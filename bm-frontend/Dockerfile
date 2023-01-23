## BUILD
# docker build -t bm-frontend:latest .
## RUN
# docker run -d -p 8080:80 bm-frontend:latest

FROM node:18.12.1-alpine3.17 as compilacion

LABEL developer="alexander.soriano@telusinternational.com"

ENV REACT_APP_BACKEND_BASE_URL=http://localhost:3000

# Copiando mi applicacion
COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

## Fase 2

FROM nginx:1.22.1-alpine

COPY --from=compilacion /opt/app/build /usr/share/nginx/html
