# README - API de Concesionarios y Coches  

## Descripción

Este proyecto consiste en una API REST para gestionar concesionarios y coches. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) en concesionarios y coches.

## Modelo de Datos

La API utiliza el siguiente modelo de datos:

### Concesionario

- `id`: Identificador único del concesionario.
- `nombre`: Nombre del concesionario.
- `direccion`: Dirección del concesionario.
- `coches`: Lista de coches disponibles en el concesionario.

### Coche

- `modelo`: Modelo del coche.
- `cv`: Potencia del coche.
- `precio`: Precio del coche.

## Endpoints

La API ofrece los siguientes endpoints:

- `GET /concesionarios`: Obtener todos los concesionarios.

- `POST /concesionarios`: Crear un nuevo concesionario.

- `GET /concesionarios/:id`: Obtener un concesionario por ID.

- `PUT /concesionarios/:id`: Actualizar un concesionario por ID.

- `DELETE /concesionarios/:id`: Borrar un concesionario por ID.

- `GET /concesionarios/:id/coches`: Obtener todos los coches de un concesionario.

- `POST /concesionarios/:id/coches`: Añadir un nuevo coche a un concesionario.

- `GET /concesionarios/:id/coches/:cocheId`: Obtener un coche por ID de un concesionario.

- `PUT /concesionarios/:id/coches/:cocheId`: Actualizar un coche por ID de un concesionario.

- `DELETE /concesionarios/:id/coches/:cocheId`: Borrar un coche por ID de un concesionario.

## Uso

Para utilizar esta API, sigue estos pasos:

1. Clona este repositorio: `git clone <https://github.com/jorge1RA/API_Rest.git>`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `node index.js`
4. Utiliza herramientas como Postman para probar las rutas y operaciones de la API.

## Seguridad

Esta API utiliza el middleware Helmet para mejorar la seguridad. Helmet ayuda a proteger la aplicación de varias vulnerabilidades conocidas mediante la configuración de encabezados HTTP de manera segura.

## Verificación del Código

Este proyecto utiliza ESLint para verificar el código y aplicar reglas de estilo, asegurando un código limpio y consistente.


