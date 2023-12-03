// Importamos Mongoose, una librería que facilita la interacción con bases de datos MongoDB en Node.js.
const mongoose = require("mongoose");

// Definición de esquemas para los datos
// --------------------------------------

// Esquema para los coches
const cocheSchema = new mongoose.Schema({
  id: String, // Un identificador único para el coche.
  modelo: String, // El modelo del coche.
  cv: Number, // La potencia del vehículo
  precio: Number, // El precio del coche.
});

// Esquema para los concesionarios
const concesionarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // Indica que el nombre es obligatorio.
  },

  direccion: {
    type: String,
    required: true, // Indica que la dirección es obligatoria.
  },

  // Un array de coches según el esquema definido
  coches: [cocheSchema],
});

// Creación del modelo Concesionario
// ----------------------------------

// Creamos un modelo llamado "Concesionario" que utilizará el esquema "concesionarioSchema".
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

// Exportamos el modelo para que pueda ser utilizado en otros archivos.
module.exports = Concesionario;
