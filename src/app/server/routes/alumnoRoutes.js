const express = require('express');
const bodyParser = require('body-parser');
const Alumno = require('../models/alumno');

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro
router.post('/register-alumno', (req, res) => {
  const { matricula, rfid, nombre, email, password } = req.body;

  if (!matricula || !rfid || !nombre || !email || !password) {
    return res.status(400).json({ message: 'Proporcione todos los datos' });
  }

  const newAlumno = new Alumno({ matricula, rfid, nombre, email, password });

  newAlumno.save()
    .then(() => {
      res.status(201).json({ message: 'Alumno registrado con éxito' });
    })
    .catch((error) => {
      console.error('Error al guardar el alumno en la base de datos:', error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    });
});

module.exports = router;
