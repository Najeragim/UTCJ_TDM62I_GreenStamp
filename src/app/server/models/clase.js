const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
  fecha_hora: { type: String, required: true },
  tutor: { type: String, required: true },
  materia: { type: String, required: true },
  alumnos: [{
    matricula: { type: String, required: true },
    asistencia: { type: String, required: true }
  }],
  estado: { type: String, required: true },
});

const Clase = mongoose.model('Clase', claseSchema);

module.exports = Clase;
