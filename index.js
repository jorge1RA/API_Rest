/* eslint-env node */
// Estamos usando Node.js, donde ciertas reglas podemos hacer que sean ignoradas ya
// que estamos usando Eslint.

// Importamos Mongoose
const mongoose = require("mongoose");

// Importamos PostgreSQL
const { Pool } = require("pg");

// Importamos las bibliotecas necesarias concretamente el framework express.
const express = require("express");

// Importamos helmet 'middleware de seguridad para Express'
const helmet = require("helmet");

// Importamos Swagger UI
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = requiere('./swagger.json'); 

// Importamos el modelo de Concesionario
const Concesionario = require('./modelo/concesionario');

// Inicializamos la aplicación express
const app = express();

// Configuraciones iniciales
app.use(express.json());

// Configuración de middleware de seguridad Helmet
app.use(helmet()); 

// Configuración Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8080;

// Conexión a Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/mi_bd")
  .then(() => {
    console.log("Conectado a MongoDB");
    SubirBaseDeDatos(); // Llamamos aquí a la función para asegurar que la conexión esté establecida
  })
  .catch((err) => console.error("Error al conectar con MongoDB", err));

// Conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mi_bd",
  password: "0000",
  port: 5432,
});
pool.on("connect", () => {
  console.log("Conectado a la base de datos PostgreSQL");
});

// Función de subida de datos a la BD 
async function SubirBaseDeDatos() {
  const concesionarios = [
    // Alojamiaento de datos de concesionarios en el caso necesario aquí...
  ];

  try {
    await Concesionario.insertMany(concesionarios);
    console.log("Base de datos subida con éxito");
  } catch (err) {
    console.error("Error al subirla base de datos:", err);
  }
}

// Obtener todos los concesionarios.(GET)
//http://localhost:8080/concesionarios/
app.get("/concesionarios", async (request, response) => {
  try {
    // Inserta los datos en la base de datos utilizando el modelo "Concesionario"
    response.json(await Concesionario.find());
  } catch (err) {
    // En caso de error, muestra un mensaje de error
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
app.delete("/concesionarios/:concesionarioId/coches/:cocheId", async (request, response) => {
  try {
    const update = { $pull: { coches: { _id: request.params.cocheId } } };
    const concesionario = await Concesionario.findByIdAndUpdate(request.params.concesionarioId, update, { new: true });

    if (!concesionario) {
      return response.status(404).send("Concesionario o coche no encontrado");
    }

    response.json({ message: "Coche borrado del concesionario con éxito" });
  } catch (err) {
    response.status(500).send(err.message);
  }
});


// Arrancamos la aplicación en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

