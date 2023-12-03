/* eslint-env node */
// Estamos usando Node.js, donde ciertas reglas podemos hacer que sean ignoradas ya
// que estamos usando Eslint.

/**
 * Tres formas de almacenar valores en memoria en javascript:
 *   let: se puede modificar
 *   var: se puede modificar
 *   const: es constante y no se puede modificar
 */

// MODIFICACIÓN ENDPOINT - MONGOOSE-DB

// Importamos Mongoose
const mongoose = require("mongoose");

// Conexión Mongoose
  mongoose.connect("mongodb://127.0.0.1:27017/mi_bd")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB", err));

// Importamos PostgreSQL
const { Pool } = require("pg");

// Conexión PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mi_bd",
  password: "0000",
  port: 5432,
});

// Manejador de conexiones
pool.on("connect", () => {
  console.log("Conectado a la base de datos PostgreSQL");
});


// Conexión a MongoDB y PostgreSQL...
const Concesionario = require('./modelo/concesionario');

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
app.get("/concesionarios", async (request, response) => {
  try {
    response.json(await Concesionario.find());
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Crear un nuevo concesionario.(POST)
//http://localhost:8080/concesionarios/ (Adjuntar en JSON el concesionario nuevo que se quiera crear)
app.post("/concesionarios", async (request, response) => {
  try {
    const concesionario = await new Concesionario(request.body).save();
    response.status(201).json(concesionario);
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Obtener un concesionario.(GET)
//http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para obtener')
app.get("/concesionarios/:id", async (request, response) => {
  try {
    const concesionario = await Concesionario.findById(request.params.id);
    response.json(concesionario || { error: "Concesionario no encontrado" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Actualizar un concesionarios.(PUT)
// http://localhost:8080/concesionarios/1 (Escribe en el body el cambio a realizar)
app.put("/concesionarios/:id", async (request, response) => {
  try {
    const concesionario = await Concesionario.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
    response.json(concesionario || { error: "Concesionario no encontrado" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Borrar un concesionario.(DELETE)
// http://localhost:8080/concesionarios/1 (Ejemplo:1,2,3,4 'Elegir por id el número asignado para borrar')
app.delete("/concesionarios/:id", async (request, response) => {
  try {
    const concesionario = await Concesionario.findByIdAndDelete(request.params.id);
    response.json(concesionario ? { message: "Concesionario borrado con éxito" } : { error: "Concesionario no encontrado" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Devuelve todos los coches del concesionario pasado por id (solo los coches) (GET)
// http://localhost:8080/concesionarios/1/coches (Ejemplo:1,2,3,4 'Elegir por id el número asignado devolver todos los coches de casa concesionario')
app.get("/concesionarios/:id/coches", async (request, response) => {
  try {
    const concesionario = await Concesionario.findById(request.params.id, 'coches');
    response.json(concesionario ? concesionario.coches : { error: "Concesionario no encontrado" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Añadir un nuevo coche al concesionario pasado por id.(POST)
// http://localhost:8080/concesionarios/1/coches
app.post("/concesionarios/:id/coches", async (request, response) => {
  try {
    await Concesionario.findByIdAndUpdate(request.params.id, { $push: { coches: request.body } });
    response.json({ message: "Coche añadido al concesionario con éxito" });
  } catch (err) {
    response.status(404).send("Concesionario no encontrado");
  }
});


// Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id.(GET)
// http://localhost:8080/concesionarios/1/coches/a1
app.get("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  try {
    const concesionario = await Concesionario.findById(request.params.id, 'coches');
    const coche = concesionario ? concesionario.coches.id(request.params.cocheId) : null;
    response.json(coche || { error: "Concesionario o coche no encontrado" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id. (PUT)
// http://localhost:8080/concesionarios/1/coches/a1
app.put("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  try {
    const result = await Concesionario.findOneAndUpdate(
      { "_id": request.params.id, "coches._id": request.params.cocheId },
      { "$set": { "coches.$": request.body } },
      { new: true }
    );
    if (!result) return response.status(404).send("Concesionario o coche no encontrado");
    response.json({ message: "Coche actualizado con éxito" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Borra el coche cuyo id sea cocheId, del concesionario pasado por id. (DELETE)
// http://localhost:8080/concesionarios/1/coches/a1
app.delete(
  "/concesionarios/:concesionarioId/coches/:cocheId",
  (request, response) => {
    const concesionario = concesionarios.find(
      (concesionario) => concesionario.id === request.params.concesionarioId
    );
    concesionario?.coches.splice(
      concesionario.coches.findIndex(
        (coche) => coche.id === request.params.cocheId
      ),
      1
    );
    response.json({ message: "Coche borrado del concesionario con éxito" });
  }
);
