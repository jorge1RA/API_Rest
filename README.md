# Este es mi archivo readme

Este archivo se escribe en formato markdown.

## Propósito del proyecto

Este es un proyecto didáctico en el que vamos a crear una API REST.

# API de Concesionarios y Coches

Esta es una API web simple que permite gestionar concesionarios y coches. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) en concesionarios y coches.

## Modelo de Datos

La API utiliza el siguiente modelo de datos:

### Concesionario

- `id`: Identificador único del concesionario.
- `nombre`: Nombre del concesionario.
- `direccion`: Dirección del concesionario.
- `coches`: Lista de coches disponibles en el concesionario.

### Coche

- `modelo`: Modelo del coche.
- `cv`: Potencia del coche en caballos de fuerza.
- `precio`: Precio del coche.

## Endpoints

La API ofrece los siguientes endpoints:

- `GET /concesionarios`: Obtener todos los concesionarios.
- `POST /concesionarios`: Crear un nuevo concesionario.
- `GET /concesionarios/:id`: Obtener un concesionario por ID.
- `PUT /concesionarios/:id`: Actualizar un concesionario por ID.
- `DELETE /concesionarios/:id`: Borrar un concesionario por ID.
- `GET /concesionarios/:id/coches`: Obtener todos los coches de un concesionario por ID.
- `POST /concesionarios/:id/coches`: Añadir un nuevo coche a un concesionario por ID.
- `GET /concesionarios/:id/coches/:cocheId`: Obtener un coche específico de un concesionario por ID.
- `PUT /concesionarios/:id/coches/:cocheId`: Actualizar un coche específico de un concesionario por ID.
- `DELETE /concesionarios/:id/coches/:cocheId`: Borrar un coche específico de un concesionario por ID.

## Uso

1. Clonar este repositorio: `git clone <https://github.com/jorge1RA/API_Rest.git>`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `node index.js`
4. Utiliza herramientas como Postman para probar las rutas y operaciones de la API.



