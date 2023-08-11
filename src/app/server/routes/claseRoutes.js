const express = require('express');
const bodyParser = require('body-parser');
const Clase = require('../models/clase');

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta de registro de clase
router.post('/register-clase', (req, res) => {
    const { fecha_hora, tutor, materia, alumnos, estado, salon } = req.body;

    if (!fecha_hora || !tutor || !materia || !alumnos || !estado || !salon) {
        return res.status(400).json({ message: 'Proporcione todos los datos' });
    }

    const newClase = new Clase({
        fecha_hora,
        tutor,
        materia,
        alumnos,
        estado,
        salon
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

//--------------------------------------------------------------------------------------------------
// Ruta para obtener las materias asociadas a un tutor específico
router.get('/tutor/:matricula/materias', (req, res) => {
    const tutorMatricula = req.params.matricula;

    Clase.distinct('materia', { tutor: tutorMatricula })
        .then((materias) => {
            res.status(200).json(materias);
        })
        .catch((err) => {
            console.error('Error al obtener las materias del tutor:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener las fechas asociadas a una materia y un tutor específico
router.get('/tutor/:matricula/materia/:materia/fechas', (req, res) => {
    const tutorMatricula = req.params.matricula;
    const materia = req.params.materia;

    Clase.find({ tutor: tutorMatricula, materia }, 'fecha_hora')
        .then((fechas) => {
            res.status(200).json(fechas);
        })
        .catch((err) => {
            console.error('Error al obtener las fechas del tutor y materia:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener los detalles de una clase específica para un tutor, materia y fecha específicos
router.get('/tutor/:matricula/materia/:materia/fecha/:fecha', (req, res) => {
    const tutorMatricula = req.params.matricula;
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    Clase.findOne({ tutor: tutorMatricula, materia, fecha_hora })
        .then((clase) => {
            if (!clase) {
                res.status(404).json({ message: 'Clase no encontrada' });
            } else {
                res.status(200).json(clase);
            }
        })
        .catch((err) => {
            console.error('Error al obtener los detalles de la clase del tutor:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener todas las clases (pendientes y activas) de un tutor específico
router.get('/tutor/:matricula/clases', (req, res) => {
    const tutorMatricula = req.params.matricula;

    Clase.find({ tutor: tutorMatricula, estado: { $in: ['pendiente', 'activa'] } })
        .then((clases) => {
            res.status(200).json(clases);
        })
        .catch((err) => {
            console.error('Error al obtener las clases del tutor:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});


//-------------------------------------------------------------------------------------------------------------
// Ruta para obtener las clases pendientes de un alumno específico
router.get('/alumno/:matricula/clases/pendientes', (req, res) => {
    const alumnoMatricula = req.params.matricula;

    Clase.find({ 'alumnos.matricula': alumnoMatricula, estado: 'pendiente' })
        .then((clases) => {
            res.status(200).json(clases);
        })
        .catch((err) => {
            console.error('Error al obtener las clases pendientes del alumno:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para obtener las clases en curso o terminadas con asistencias de un alumno específico
router.get('/alumno/:matricula/clases/asistencias', (req, res) => {
    const alumnoMatricula = req.params.matricula;

    Clase.find({ 'alumnos.matricula': alumnoMatricula, estado: { $in: ['en curso', 'terminada'] } })
        .then((clases) => {
            res.status(200).json(clases);
        })
        .catch((err) => {
            console.error('Error al obtener las clases con asistencias del alumno:', err);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });

    });

// Ruta para cambiar el estado de una clase a "activa"
router.put('/clase/:materia/fecha/:fecha/estado', (req, res) => {
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    Clase.findOneAndUpdate({ materia, fecha_hora }, { estado: 'activa' }, { new: true })
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            res.status(200).json({ message: 'Estado de la clase cambiado a "activa"' });
        })
        .catch((error) => {
            console.error('Error al cambiar el estado de la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});
// Ruta para cambiar el estado de una clase a "finalizado" si está en estado "activa"
router.put('/clase/:materia/fecha/:fecha/finalizar', (req, res) => {
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    Clase.findOne({ materia, fecha_hora })
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }

            if (clase.estado !== 'activa') {
                return res.status(400).json({ message: 'El estado actual de la clase no es "activa"' });
            }

            // Cambiar el estado a "finalizado" solo si el estado actual es "activa"
            clase.estado = 'finalizado';

            // Cambiar el estado de los alumnos a "falta"
            clase.alumnos.forEach((alumno) => {
                alumno.asistencia = 'falta';
            });

            return clase.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Estado de la clase cambiado a "finalizado", alumnos marcados como "falta"' });
        })
        .catch((error) => {
            console.error('Error al cambiar el estado de la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});




module.exports = router;
