const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('../models/admin');

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro
router.post('/register-admin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Proporcione todos los datos' });
  }

  const newAdmin = new Admin({ email, password });

  newAdmin.save()
    .then(() => {
      res.status(201).json({ message: 'Administrador registrado con éxito' });
    })
    .catch((error) => {
      console.error('Error al guardar al administrador en la base de datos:', error);
      res.status(500).json({ message: 'Error Interno del Servidor' });
    });
});

module.exports = router;
