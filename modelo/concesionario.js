const mongoose = require("mongoose");

// Esquema para los coches
const cocheSchema = new mongoose.Schema({
  id: String,
  modelo: String,
  cv: Number,
  precio: Number,
});

// Esquema para los concesionarios
const concesionarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  
  direccion: {
    type: String,
    required: true,
  },

  // Un array de coches según el esquema definido
  coches: [cocheSchema], 
});

// Creación del modelo Concesionario
const Concesionario = mongoose.model("Concesionario", concesionarioSchema);

module.exports = Concesionario;
