# Microservicio para autenticacion
Este micro servicio se encargara de la creacion de los tokes de autenticacion mediante usuario y contrasena

## Comandos basicos
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
 - Version LTS de node 20.15.1

# Librerias a usar
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

## instlaciones de paquetes
```bash
> yarn add express bcryptjs cors cross-env joi mongoose uuid yenv amqplib jwt-simple
# instalar typos para typescript
> yarn add --dev @types/express @types/bcryptjs @types/cors @types/mongoose @types/uuid yenv @types/amqplib
```

## instlaciones de paquetes de desarrollo
```bash
> yarn add --dev gulp gulp-uglify-es rimraf ts-node typescript ts-node-dev eslint lint-staged jest ts-jest
```