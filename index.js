/* eslint-env node */
// IMPORTANTE: ESTAMOS USANDO Node.js Y CIERTAS REGLAS DEBEN SER IGNORADAS AL USAR ESLINT
// POR ESO AL COMIENZO COLOCAMPOS DE MANERA COMENTADA: /* eslint-env node */

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
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

// Obtener todos los concesionarios (GET)
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crear un nuevo concesionario (POST)
app.post("/concesionarios", (request, response) => {
  concesionarios.push(request.body);
  response.json({ message: "Concesionario creado con éxito" });
});

// Obtener un solo concesionario (GET)
app.get("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({});
});

// Actualizar un solo concesionarios (PUT)
app.put("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "Concesionario actualizado con éxito" });
});

// Borrar un elemento del array (DELETE)
app.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter(
    (item) => concesionarios.indexOf(item) !== id
  );

  response.json({ message: "Concesionario borrado con éxito" });
});

// Devuelve todos los coches
// del concesionario pasado por id (solo los coches).(GET)
app.get("/coches", (request, response) => {
  response.json(coches);
});

// Añadir un nuevo coche al concesionario pasado por id
// (solo los coches) (GET)
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "Coche creado al concesionario con éxito" });
});

// Añade un nuevo coche al concesionario pasado por id.(POST)
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});

// Obtiene el coche cuyo id sea cocheId, del concesionario
// pasado por id (GET)
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "CocheId obtenido del concesionario con éxito" });
});

// Actualiza el coche cuyo id sea cocheId, del concesionario
// pasado por id (PUT)
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "CocheId actualizado del concesionario con éxito" });
});

// Borra el coche cuyo id sea cocheId, del concesionario pasado
// por id (DELETE)
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);

  response.json({ message: "CocheId borrado del concesionario con éxito" });
});
