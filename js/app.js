const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let concesionarios = [];

// Ruta para obtener todos los concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

// Ruta para crear un nuevo concesionario
app.post("/concesionarios", (req, res) => {
  const nuevoConcesionario = req.body;
  concesionarios.push(nuevoConcesionario);
  res.status(201).json(nuevoConcesionario);
});

// Implementa los demás endpoints según las especificaciones

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
