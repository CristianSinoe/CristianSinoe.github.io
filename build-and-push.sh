#!/bin/bash

# CONFIGURA TUS DATOS
DOCKER_USER="sinoeruiz"
DOCKER_IMAGE_NAME="mycv"
TAG="latest"

# 1. Construir Angular
echo "Instalando dependencias y construyendo Angular..."
npm install
npm run build --output-path=docs

# 2. Crear contenedor base
echo "Levantando contenedor httpd temporal..."
docker run -d --name http_base httpd

# 3. Copiar archivos al contenedor
echo "Copiando archivos de Angular a /usr/local/apache2/htdocs..."
docker cp docs/. http_base:/usr/local/apache2/htdocs

# 4. Verificar contenido copiado
docker exec http_base ls /usr/local/apache2/htdocs

# 5. Crear imagen personalizada desde el contenedor
echo "Creando imagen personalizada..."
docker commit http_base ${DOCKER_IMAGE_NAME}_base
docker tag ${DOCKER_IMAGE_NAME}_base ${DOCKER_USER}/${DOCKER_IMAGE_NAME}:${TAG}

# 6. Login a Docker Hub
echo "Iniciando sesión en Docker Hub..."
docker login -u ${DOCKER_USER}

# 7. Push de la imagen
echo "Subiendo imagen a Docker Hub..."
docker push ${DOCKER_USER}/${DOCKER_IMAGE_NAME}:${TAG}

# 8. Limpieza (opcional)
echo "Eliminando contenedor temporal..."
docker rm -f http_base

echo "Proceso completado. Imagen disponible en: https://hub.docker.com/r/${DOCKER_USER}/${DOCKER_IMAGE_NAME}"
