const express = require('express');
const bodyParser = require('body-parser');
const Tutor = require('../models/tutor');

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro
router.post('/register-tutor', (req, res) => {
  const { matricula, nombre, email, password } = req.body;

  if (!matricula || !nombre || !email || !password) {
    return res.status(400).json({ message: 'Proporcione todos los datos' });
  }

  const newTutor = new Tutor({ matricula, nombre, email, password });

  newTutor.save()
    .then(() => {
      res.status(201).json({ message: 'Tutor registrado con éxito' });
    })
    .catch((error) => {
      console.error('Error al guardar el tutor en la base de datos:', error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    });
});

module.exports = router;
