# Desplegar una aplicacion de forma local con kubernetes

## Pasos:
  1. Descargar e instalar Registry para almecenar imagenes de forma local 

```sh
docker run -d -p 5000:5000 --restart always --name registry registry:2
```
  2. Sustiur en las imagenes de docker para que apunte al servidor de registro

```sh
gateway:
    build:
      dockerfile: gateway/Dockerfile
      context: .
    image: localhost:5000/image-gateway
```

  3. subir las imagenes al servidor de registro usando docker compose

```sh
docker-compose -f docker-compose-images.yaml up -d --build
```
# archivo por archivo
```sh
# entrar al directorio
docker build -t imagen-ms-auth .
docker tag imagen-ms-auth localhost:5000/imagen-ms-auth
docker push localhost:5000/magen-ms-auth
```

## subir al repositorio local
```sh
docker push localhost:5001/imagen-ms-auth
docker push localhost:5001/image-ms-order
docker push localhost:5001/image-ms-payment
docker push localhost:5001/image-ms-delivery
docker push localhost:5001/image-ms-store
docker push localhost:5001/image-gateway
```

http://localhost:5001/v2/_catalog


# instalar ingress-ngix
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```