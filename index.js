/* eslint-env node */
// IMPORTANTE: ESTAMOS USANDO Node.js Y CIERTAS REGLAS DEBEN SER IGNORADAS AL USAR ESLINT
// POR ESO AL COMIENZO COLOCAMPOS DE MANERA COMENTADA: /* eslint-env node */

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *     # let: se puede modificar
 *     # var: se puede modificar
 *     # const: es constante y no se puede modificar
 */

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
  try {
    const nuevoConcesionario = request.body;
    // Validar los datos aquí si es necesario
    if (
      !nuevoConcesionario ||
      !nuevoConcesionario.nombre ||
      !nuevoConcesionario.direccion
    ) {
      response
        .status(400)
        .json({ message: "Datos de concesionario no válidos" });
      return;
    }
    concesionarios.push(nuevoConcesionario);
    response.json({ message: "Concesionario creado con éxito" });
  } catch (error) {
    console.error("Error al crear el concesionario:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
});

/*app.post("/concesionarios", (request, response) => {
  const nuevoConcesionario = request.body;
  concesionarios.push(nuevoConcesionario);
  response.json({ message: "Concesionario creado con éxito" });
});*/

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
