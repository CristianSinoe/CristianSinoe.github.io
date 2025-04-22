# Etapa 1: Compilar la app Angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Etapa 2: Servir con NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/mycv /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
