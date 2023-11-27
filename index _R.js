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
let coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
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
  response.json({ result });
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
