# Este es mi archivo readme

Este archivo se escribe en formato markdown.

## Propósito del proyecto

Este es un proyecto didáctico en el que vamos a crear una API REST.

# API de Concesionarios y Coches

Esta es una API web simple que permite gestionar concesionarios y coches. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) en concesionarios y coches.

## Modelo de Datos

La API utiliza el siguiente modelo de datos:

### Inicio del Servidor

El servidor se inicia con Express y se configura para escuchar en un puerto, en nuestro caso 8080, utilizando express.json() para manejar datos en formato JSON.

const express = require("express");
const app = express();
app.use(express.json());


### Estructura del código

// Definimos una estructura de datos (temporal hasta incorporar una base de datos).
let concesionarios = [
  {
    id: "1",
    nombre: "Concesionario Premium",
    direccion: "Calle Principal 123",
    coches: [
      { id: "a1", modelo: "BMW Serie 3", cv: 255, precio: 45000 },
      { id: "a2", modelo: "Audi A4", cv: 201, precio: 41000 },
    ],
  },
  {
    id: "2",
    nombre: "Concesionario Deportivo",
    direccion: "Avenida Revolución 456",
    coches: [
      { id: "b1", modelo: "Porsche 911", cv: 379, precio: 100000 },
      { id: "b2", modelo: "Chevrolet Corvette", cv: 490, precio: 59000 },
    ],
  },
  {
    id: "3",
    nombre: "Concesionario Familiar",
    direccion: "Bulevar del Parque 789",
    coches: [
      { id: "c1", modelo: "Toyota RAV4", cv: 203, precio: 36000 },
      { id: "c2", modelo: "Honda CR-V", cv: 190, precio: 33000 },
    ],
  },
  {
    id: "4",
    nombre: "Concesionario Económico",
    direccion: "Ruta del Sol 101",
    coches: [
      { id: "d1", modelo: "Hyundai Elantra", cv: 147, precio: 20000 },
      { id: "d2", modelo: "Kia Forte", cv: 147, precio: 19000 },
    ],
  },
];


### Concesionario

- `id`: Identificador único del concesionario.
- `nombre`: Nombre del concesionario.
- `direccion`: Dirección del concesionario.
- `coches`: Lista de coches disponibles en el concesionario.

### Coche

- `modelo`: Modelo del coche.
- `cv`: Potencia del coche 
- `precio`: Precio del coche.

## Endpoints

La API ofrece los siguientes endpoints:

- `GET /concesionarios`: Obtener todos los concesionarios.

//http://localhost:8080/concesionarios/
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

- `POST /concesionarios`: Crear un nuevo concesionario.

//http://localhost:8080/concesionarios/ (Adjuntar en JSON el concesionario nuevo que se quiera crear)
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "Concesionario creado con éxito" });
});

- `GET /concesionarios/:id`: Obtener un concesionario por ID.

//http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para obtener')
app.get("/concesionarios/:id", (request, response) => {
  response.json({
    concesionario: concesionarios.find(
      (concesionario) => concesionario.id === request.params.id
    ),
  });
});

- `PUT /concesionarios/:id`: Actualizar un concesionario por ID.

// http://localhost:8080/concesionarios/1 (Escribe en el body el cambio a realizar)
app.put("/concesionarios/:id", (request, response) => {
  const concesionario = concesionarios.find(
    (concesionario) => concesionario.id === request.params.id
  );
  if (concesionario) Object.assign(concesionario, request.body);
  response.json({ message: "Concesionario actualizado con éxito" });
});

- `DELETE /concesionarios/:id`: Borrar un concesionario por ID.

// http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para borrar')
app.delete("/concesionarios/:id", (request, response) => {
  concesionarios = concesionarios.filter(
    (concesionario) => concesionario.id !== request.params.id
  );
  response.json({ message: "Concesionario borrado con éxito" });
});

- `GET /concesionarios/:id/coches`: Devuelve todos los coches del concesionario pasado por id (solo los coches).

// http://localhost:8080/concesionarios/1/coches (Ejemplo:1,2,3,4 'Elegir por id el número asignado devolver todos los coches de casa concesionario')
app.get("/concesionarios/:id/coches", (request, response) => {
  const coches =
    concesionarios.find(
      (concesionario) => concesionario.id === request.params.id
    )?.coches || [];
  response.json(coches);
});

- `POST /concesionarios/:id/coches`: Añade un nuevo coche al concesionario pasado por id.

// http://localhost:8080/concesionarios/1/coches
app.post("/concesionarios/:id/coches", (request, response) => {
  concesionarios
    .find((concesionario) => concesionario.id === request.params.id)
    ?.coches.push(request.body);
  response.json({ message: "Coche añadido al concesionario con éxito" });
});

- `GET /concesionarios/:id/coches/:cocheId`: Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id

// http://localhost:8080/concesionarios/1/coches/a1
app.get("/concesionarios/:id/coches/:cocheId", (request, response) =>
  response.json(
    concesionarios
      .find((concesionario) => concesionario.id === request.params.id)
      ?.coches.find((coche) => coche.id === request.params.cocheId) || {
      error: "Coche no encontrado",
    }
  )
);

- `PUT /concesionarios/:id/coches/:cocheId`: Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id

// http://localhost:8080/concesionarios/1/coches/a1
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const coche = concesionarios
    .find((concesionario) => concesionario.id === request.params.id)
    ?.coches.find((coche) => coche.id === request.params.cocheId);
  coche && Object.assign(coche, request.body);
  response.json({ message: "Coche del concesionario actualizado con éxito" });
});

- `DELETE /concesionarios/:id/coches/:cocheId`: Borra el coche cuyo id sea cocheId, del concesionario pasado por id

// http://localhost:8080/concesionarios/1/coches/a1
app.delete("/concesionarios/:concesionarioId/coches/:cocheId", (request, response) => {
  const concesionario = concesionarios.find(concesionario => concesionario.id === request.params.concesionarioId);
  concesionario?.coches.splice(concesionario.coches.findIndex(coche => coche.id === request.params.cocheId), 1);
  response.json({ message: "Coche borrado del concesionario con éxito" });
});


## Uso

1. Clonar este repositorio: `git clone <https://github.com/jorge1RA/API_Rest.git>`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `node index.js`
4. Utiliza herramientas como Postman para probar las rutas y operaciones de la API.

## ESLint

Este proyecto utiliza ESLint, una herramienta que verifica posibles errores del código y aplica reglas de estilo para mantener un código limpio y consistente.
