/* eslint-env node */
// Estamos usando Node.js, donde ciertas reglas podemos hacer que sean ignoradas ya
// que estamos usando Eslint.

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *   let: se puede modificar
 *   var: se puede modificar
 *   const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación.
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest).
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación.
const port = process.env.PORT || 8080;

// Arrancamos la aplicación.
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

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

// Obtener todos los concesionarios.(GET)
//http://localhost:8080/concesionarios/
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crear un nuevo concesionario.(POST)
//http://localhost:8080/concesionarios/ (Adjuntar en JSON el concesionario nuevo que se quiera crear)
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "Concesionario creado con éxito" });
});

// Obtener un solo concesionario.(GET)
//http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para obtener')
app.get("/concesionarios/:id", (request, response) => {
  response.json({
    concesionario: concesionarios.find(
      (concesionario) => concesionario.id === request.params.id
    ),
  });
});

// Actualizar un solo concesionarios.(PUT)
// http://localhost:8080/concesionarios/1 (Escribe en el body el cambio a realizar)
app.put("/concesionarios/:id", (request, response) => {
  const concesionario = concesionarios.find((concesionario) => concesionario.id === request.params.id);
  if (concesionario) Object.assign(concesionario, request.body);
  response.json({ message: "Concesionario actualizado con éxito" });
});

// Borrar un elemento del array.(DELETE)
// http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para borrar')
app.delete("/concesionarios/:id", (request, response) => {
  concesionarios = concesionarios.filter(
    (concesionario) => concesionario.id !== request.params.id
  );
  response.json({ message: "Concesionario borrado con éxito" });
});

// Devuelve todos los coches del concesionario pasado por id (solo los coches).(GET)
// http://localhost:8080/concesionarios/:id/coches
app.get("/concesionarios/:id/coches", (request, response) => {
  const concesionario = concesionarios.find((concesionario) => concesionario.id === request.params.id);
  response.json(concesionario?.coches || []);
});

// Añadir un nuevo coche al concesionario pasado por id (solo los coches).(GET)
// http://localhost:8080/concesionarios/1/coches
app.post("/concesionarios/:id/coches", (request, response) => {
  concesionarios
    .find((concesionario) => concesionario.id === request.params.id)
    ?.coches.push(request.body);
  response.json({ message: "Coche añadido al concesionario con éxito" });
});

// Añade un nuevo coche al concesionario pasado por id.(POST)
// http://localhost:8080/concesionarios/:id/coches
app.get("/coches/:id", (request, response) => {
  response.json({
    result: coches.find((coche) => coche.id === request.params.id),
  });
});

// Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id.(GET)
// http://localhost:8080/concesionarios/:id/coches/:cochesId
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const { id, cocheId } = request.params;
  const coche = concesionarios[id]?.coches.find(
    (concesionario) => concesionario.id === cocheId
  );
  response.json({
    message: "CocheId obtenido del concesionario con éxito",
    coche,
  });
});

// Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id. (PUT)
// http://localhost:8080/concesionarios/:id/coches/:cochesId
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const { id, cocheId } = request.params;
  const concesionario = concesionarios.find(
    (concesionario) => concesionario.id === id
  );
  if (concesionario)
    Object.assign(
      concesionario.coches.find(
        (concesionario) => concesionario.id === cocheId
      ),
      req.body
    );
  response.json({ message: "CocheId actualizado del concesionario con éxito" });
});

// Borra el coche cuyo id sea cocheId, del concesionario pasado por id. (DELETE)
// http://localhost:8080/concesionarios/:id/coches/:cochesId
app.delete("/coches/:id", (req, res) => {
  coches = coches.filter((item) => item.id !== req.params.id);
  res.json({ message: "CocheId borrado del concesionario con éxito" });
});
