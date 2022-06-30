FROM node:16-alpine AS ui-build
WORKDIR /usr/src/app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

FROM socialengine/nginx-spa
COPY --from=ui-build /usr/src/app/build/ /app