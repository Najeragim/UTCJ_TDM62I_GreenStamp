const express = require('express');
const bodyParser = require('body-parser');
const Admin = require('../models/admin'); 
const Alumno = require('../models/alumno'); 
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

// Ruta para verificar si un tutor con una matrícula específica existe
router.get('/tutor/:matricula/existe', async (req, res) => {
  const matricula = req.params.matricula;

  try {
    
    const tutor = await Tutor.findOne({ matricula });
    if (tutor) {
      return res.status(200).json({ message: 'Matrícula encontrada en la colección de tutors' });
    }

    const alumno = await Alumno.findOne({ matricula });
    if (alumno) {
      return res.status(200).json({ message: 'Matrícula encontrada en la colección de alumnos' });
    }

    res.status(404).json({ message: 'Matrícula no encontrada en ninguna colección' });
  } catch (error) {
    console.error('Error al verificar la existencia de la matrícula:', error);
    res.status(500).json({ message: 'Error Interno del Servidor' });
  }
});

// Ruta para verificar si un tutor con un correo específico existe
router.get('/tutor/email/:email/existe', async (req, res) => {
  const email = req.params.email;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(200).json({ message: 'Correo encontrado en la colección de admins' });
    }

    const tutor = await Tutor.findOne({ email });
    if (tutor) {
      return res.status(200).json({ message: 'Correo encontrado en la colección de tutors' });
    }

    const alumno = await Alumno.findOne({ email });
    if (alumno) {
      return res.status(200).json({ message: 'Correo encontrado en la colección de alumnos' });
    }

    res.status(404).json({ message: 'Correo no encontrado en ninguna colección' });
  } catch (error) {
    console.error('Error al verificar la existencia del correo:', error);
    res.status(500).json({ message: 'Error Interno del Servidor' });
  }
});


module.exports = router;
