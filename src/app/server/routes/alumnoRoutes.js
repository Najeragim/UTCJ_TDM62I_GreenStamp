const express = require('express');
const bodyParser = require('body-parser');
const Alumno = require('../models/alumno');
const Admin = require('../models/admin');
const Tutor = require('../models/tutor');

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

router.post('/find-alumno', (req, res) => {
  const { rfid } = req.body;

  if (!rfid) {
      return res.status(400).json({ message: 'Proporcione el UID del RFID' });
  }

  Alumno.findOne({ rfid })
      .then((alumno) => {
          if (!alumno) {
              return res.status(404).json({ message: 'Alumno no encontrado' });
          }
          res.status(200).json({ matricula: alumno.matricula });
      })
      .catch((error) => {
          console.error('Error al buscar la matrícula del alumno:', error);
          res.status(500).json({ message: 'Error Interno del Servidor' });
      });
});


// Ruta para verificar si un alumno con una matrícula específica existe
router.get('/alumno/:matricula/existe', async (req, res) => {
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

// Ruta para verificar si un alumno con una RFID específica existe
router.get('/alumno/:rfid/existe', async (req, res) => {
  const rfid = req.params.rfid;

  try {
    const tutor = await Tutor.findOne({ rfid });
    if (tutor) {
      return res.status(200).json({ message: 'Matrícula encontrada en la colección de tutors' });
    }

    const alumno = await Alumno.findOne({ rfid });
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
router.get('/alumno/email/:email/existe', async (req, res) => {
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
