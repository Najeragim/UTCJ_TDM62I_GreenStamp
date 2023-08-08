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

// Ruta para agregar un alumno a una clase específica
router.post('/clase/:id/alumnos', (req, res) => {
    const { matricula, asistencia } = req.body;
    const claseId = req.params.id;

    if (!matricula || !asistencia) {
        return res.status(400).json({ message: 'Proporcione matricula del alumno' });
    }

    Clase.findById(claseId)
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

module.exports = router;
