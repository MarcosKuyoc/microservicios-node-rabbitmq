# Microservicios con node

Se pretende crear un e-comerce usando microservicios, el Patron SAGA nos ayudara para resolver los diferentes porblemas y RabbitMQ para poder comunicarse entre servicios, adicionalmente usaremos arquitectura hexagonal para manetner un codigo limpio y TDD.

## Herramientas
    - Docker
    - Docker Compose
    - RaabitMQ
    - Node
    - Mongo

### Comandos base de Docker y Docker compose

```bash
# para poner en marcha el servicio
> docker compose up -d 
# monitorear los servicios
> docker compose ps -a
# dar de baja el servicio
> docker compose down
```