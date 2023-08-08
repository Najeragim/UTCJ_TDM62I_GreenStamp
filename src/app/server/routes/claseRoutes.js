const express = require('express');
const bodyParser = require('body-parser');
const Clase = require('../models/clase');

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro de clase
router.post('/register-clase', (req, res) => {
    const { fecha_hora, tutor, materia, alumnos, estado } = req.body;

    if (!fecha_hora || !tutor || !materia || !alumnos || !estado) {
        return res.status(400).json({ message: 'Proporcione todos los datos' });
    }

    const newClase = new Clase({
        fecha_hora,
        tutor,
        materia,
        alumnos,
        estado
    });

    newClase.save()
        .then(() => {
            res.status(201).json({ message: 'Clase registrada con éxito' });
        })
        .catch((error) => {
            console.error('Error al guardar la clase en la base de datos:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para agregar un alumno a una clase específica por su materia y fecha_hora
router.post('/clase/:materia/fecha/:fecha/alumnos', (req, res) => {
    const { matricula, asistencia } = req.body;
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    if (!matricula || !asistencia) {
        return res.status(400).json({ message: 'Proporcione matricula del alumno' });
    }

    Clase.findOne({ materia, fecha_hora })
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }

            const nuevoAlumno = {
                matricula,
                asistencia
            };

            clase.alumnos.push(nuevoAlumno);

            return clase.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Alumno agregado a la clase exitosamente' });
        })
        .catch((error) => {
            console.error('Error al agregar el alumno a la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener detalles de una clase por su ID
router.get('/clase/:id', (req, res) => {
    const claseId = req.params.id;

    Clase.findById(claseId)
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            res.status(200).json(clase);
        })
        .catch((error) => {
            console.error('Error al obtener detalles de la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

//--------------------------------------------------------------------------------------------------
// Ruta para obtener todas las materias disponibles
router.get('/materias', (req, res) => {
    Clase.distinct('materia')
        .then((materias) => {
            res.status(200).json(materias);
        })
        .catch((err) => {
            console.error('Error al obtener las materias:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener las fechas_hora de una materia específica
router.get('/materia/:nombre/fechas', (req, res) => {
    const materia = req.params.nombre;

    Clase.find({ materia }, 'fecha_hora')
        .then((fechas) => {
            res.status(200).json(fechas);
        })
        .catch((err) => {
            console.error('Error al obtener las fechas:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener la lista de alumnos de una clase específica por su fecha_hora
router.get('/materia/:nombre/fecha/:fecha/alumnos', (req, res) => {
    const materia = req.params.nombre;
    const fecha_hora = req.params.fecha;

    Clase.findOne({ materia, fecha_hora }, 'alumnos')
        .then((clase) => {
            if (!clase) {
                res.status(404).json({ message: 'Clase no encontrada' });
            } else {
                res.status(200).json(clase.alumnos);
            }
        })
        .catch((err) => {
            console.error('Error al obtener la lista de alumnos:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});


module.exports = router;
