const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  matricula: {type: String, required: true},
  nombre: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  claseActiva: {type: String, required: true}
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
