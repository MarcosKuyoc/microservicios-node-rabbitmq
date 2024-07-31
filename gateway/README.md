# Microservicio para autenticación.
Este microservicio se encargaría de la creación de los tokens de autenticación mediante usuario y contraseña.

## Comandos básicos
```bash
# para iniciar un proyecto en node (crear el package.json)
> npm init -y 

# para buscar la version de node LTS mas reciente
> nvm ls-remote --lts #(linux o mac)
#
> nvm list available #(windowns)

# instalar yarn
> npm install -g yarn
```

# Versiones a usar
 - Versión de desarrollo LTS de node 20.15.1
 - Versión de producción LTS de node 

# Librerías a usar
- produccion
    - express
    - bcryptjs
    - cors
    - cross-env
    - joi
    - mongoose
    - uuid
    - yenv
    - amqplib
    - jwt-simple
- desarrollo
    - gulp
    - gulp-uglify-es
    - rimraf
    - ts-node
    - typescript
    - ts-node-dev
    - eslint
    - lint-staged
    - jest
    - ts-jest

## Instalaciones de paquetes
```bash
> yarn add express bcryptjs cors cross-env joi mongoose uuid yenv amqplib jwt-simple
# instalar typos para typescript
> yarn add --dev @types/express @types/bcryptjs @types/cors @types/mongoose @types/uuid yenv @types/amqplib
```

## Instalaciones de paquetes de desarrollo
```bash
> yarn add --dev gulp gulp-uglify-es rimraf ts-node typescript ts-node-dev eslint lint-staged jest ts-jest
```

## agregar Swagger
```bash
yarn add swagger-ui-express tsoa
yarn add  @types/swagger-ui-express --dev
```
# decodificar el token
```bash
yarn add jwt-decode
```


