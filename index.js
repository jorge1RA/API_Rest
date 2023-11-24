/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

/** CODIGO RAFA CLASE ANTERIOR
//Importamos las bibliotecas necesarias.
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

// Lista todos los coches
app.get("/coches", (request, response) => {
  response.json(coches);
});

// Añadir un nuevo coche
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo coche
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});

// Actualizar un solo coche
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);

  response.json({ message: "ok" });
});*/

// Importamos las bibliotecas necesarias, concretamente el framework express.
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

// Modelo de datos actualizado con concesionarios y coches
let concesionarios = [
  {
    id: 1,
    nombre: "Concesionario 1",
    direccion: "Dirección 1",
    coches: [
      { modelo: "Opel Corsa", cv: 100, precio: 15000 },
      { modelo: "Renault Clio", cv: 90, precio: 14000 },
    ],
  },
  {
    id: 2,
    nombre: "Concesionario 2",
    direccion: "Dirección 2",
    coches: [
      { modelo: "Nissan Skyline R34", cv: 300, precio: 45000 },
      { modelo: "Ford Mustang", cv: 450, precio: 55000 },
    ],
  },

  // ...
];

// Obtener todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crear un nuevo concesionario
app.post("/concesionarios", (request, response) => {
  const nuevoConcesionario = request.body;
  concesionarios.push(nuevoConcesionario);
  response.json({ message: "Concesionario creado con éxito" });
});

// Obtener un solo concesionario por ID
app.get("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const concesionario = concesionarios.find((c) => c.id === id);

  if (!concesionario) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    response.json(concesionario);
  }
});

// Actualizar un solo concesionario por ID
app.put("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);

  if (index === -1) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    concesionarios[index] = request.body;
    response.json({ message: "Concesionario actualizado con éxito" });
  }
});

// Borrar un concesionario por ID
app.delete("/concesionarios/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = concesionarios.findIndex((c) => c.id === id);

  if (index === -1) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    concesionarios.splice(index, 1);
    response.json({ message: "Concesionario borrado con éxito" });
  }
});

// Obtener un coche específico de un concesionario por ID
app.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = parseInt(request.params.id);
  const cocheId = parseInt(request.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);

  if (!concesionario) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    const coche = concesionario.coches.find((c) => c.id === cocheId);

    if (!coche) {
      response.status(404).json({ message: "Coche no encontrado" });
    } else {
      response.json(coche);
    }
  }
});

// Actualizar un coche específico de un concesionario por ID
app.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = parseInt(request.params.id);
  const cocheId = parseInt(request.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);

  if (!concesionario) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    const cocheIndex = concesionario.coches.findIndex((c) => c.id === cocheId);

    if (cocheIndex === -1) {
      response.status(404).json({ message: "Coche no encontrado" });
    } else {
      concesionario.coches[cocheIndex] = request.body;
      response.json({ message: "Coche actualizado con éxito" });
    }
  }
});

// Borrar un coche específico de un concesionario por ID
app.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const id = parseInt(request.params.id);
  const cocheId = parseInt(request.params.cocheId);
  const concesionario = concesionarios.find((c) => c.id === id);

  if (!concesionario) {
    response.status(404).json({ message: "Concesionario no encontrado" });
  } else {
    const cocheIndex = concesionario.coches.findIndex((c) => c.id === cocheId);

    if (cocheIndex === -1) {
      response.status(404).json({ message: "Coche no encontrado" });
    } else {
      concesionario.coches.splice(cocheIndex, 1);
      response.json({ message: "Coche borrado con éxito" });
    }
  }
});
