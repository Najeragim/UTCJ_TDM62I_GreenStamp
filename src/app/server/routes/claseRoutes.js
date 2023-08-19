const express = require('express');
const bodyParser = require('body-parser');
const Clase = require('../models/clase');
const Tutor = require('../models/tutor');
const globalVariables = require('../globalVariables');
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

// Código para verificar si un tutor existe
router.get('/tutor/:matricula/existe', (req, res) => {
    const tutorMatricula = req.params.matricula;

    Tutor.findOne({ matricula: tutorMatricula })
        .then((tutor) => {
            if (!tutor) {
                return res.status(404).json({ message: 'Tutor no encontrado' });
            }
            res.status(200).json({ message: 'Tutor encontrado en la base de datos' });
        })
        .catch((error) => {
            console.error('Error al verificar la existencia del tutor:', error);
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

    Clase.find({ 'alumnos.matricula': alumnoMatricula, estado: { $in: ['activa', 'finalizada'] } })
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

// Ruta para cambiar el estado de una clase a "finalizada" si está en estado "activa"
router.put('/clase/:materia/fecha/:fecha/finalizar', async (req, res) => {
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    try {
        const clase = await Clase.findOne({ materia, fecha_hora });

        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        if (clase.estado !== 'activa') {
            return res.status(400).json({ message: 'El estado actual de la clase no es "activa"' });
        }

        // Cambiar el estado a "finalizada" solo si el estado actual es "activa"
        clase.estado = 'finalizada';

        // Cambiar el estado de los alumnos a "falta" solo si su estado actual es "pendiente"
        clase.alumnos.forEach((alumno) => {
            if (alumno.asistencia === 'pendiente') {
                alumno.asistencia = 'falta';
            }
        });

        await clase.save();

        // Obtener el tutor asociado a la clase y actualizar su claseActiva a "NA"
        const tutor = await Tutor.findOne({ matricula: clase.tutor });

        if (tutor) {
            tutor.claseActiva = "NA";
            await tutor.save();
        }

        res.status(200).json({ message: 'Estado de la clase cambiado a "finalizada", alumnos marcados como "falta" y claseActiva del tutor establecido como "NA"' });
    } catch (error) {
        console.error('Error al cambiar el estado de la clase:', error);
        res.status(500).json({ message: 'Error Interno del Servidor' });
    }
});



// Ruta para obtener el ID de una clase específica por materia y fecha_hora
router.get('/clase/:materia/fecha/:fecha/id', (req, res) => {
    const materia = req.params.materia;
    const fecha_hora = req.params.fecha;

    Clase.findOne({ materia, fecha_hora }, '_id')
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            res.status(200).json({ _id: clase._id });
        })
        .catch((error) => {
            console.error('Error al obtener el ID de la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});

// Ruta para actualizar el ID de la clase activa de un tutor específico
router.post('/clase/:selectedClaseId/tutor/:tutorMatr/actualizar', async (req, res) => {
    const selectedClaseId = req.params.selectedClaseId;
    const tutorMatricula  = req.params.tutorMatr;
    try {
        const tutor = await Tutor.findOne({ matricula: tutorMatricula });
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }

        tutor.claseActiva = selectedClaseId;
        await tutor.save();

        res.status(200).json({ message: 'ID de clase activa agregado al tutor correctamente.' });
    } catch (error) {
        console.error('Error al agregar el ID de clase al tutor:', error);
        res.status(500).json({ message: 'Error Interno del Servidor' });
    }
});

// Ruta para obtener el ID de la clase activa de un tutor específico
router.get('/clase/tutor/:tutorMatricula/get-clase-activa', async (req, res) => {
    const tutorMatricula = req.params.tutorMatricula;

    try {
        const tutor = await Tutor.findOne({ matricula: tutorMatricula }).populate('clasesActivas');
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }

        res.status(200).json({ selectedClaseId: tutor.claseActiva });
    } catch (error) {
        console.error('Error al obtener la clase activa del tutor:', error);
        res.status(500).json({ message: 'Error Interno del Servidor' });
    }
});

// Ruta para obtener el estado de una clase por su ID
router.get('/get-clase-estado/:id', (req, res) => {
    const claseId = req.params.id;

    Clase.findById(claseId, 'estado')
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            res.status(200).json({ estadoClase: clase.estado });
        })
        .catch((error) => {
            console.error('Error al obtener el estado de la clase:', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});


router.put('/clase/:id/asistencia', (req, res) => {
    const claseId = req.params.id;
    const { alumnoId } = req.body;

    Clase.findById(claseId)
        .then((clase) => {
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            
            const alumno = clase.alumnos.find(a => a.matricula === alumnoId);
            if (!alumno) {
                return res.status(400).json({ message: 'Alumno no inscrito en esta clase' });
            }
            
            alumno.asistencia = 'asistido';

            return clase.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Estado del alumno cambiado a "asistido" exitosamente' });
        })
        .catch((error) => {
            console.error('Error al cambiar el estado del alumno a "asistido":', error);
            res.status(500).json({ message: 'Error Interno del Servidor' });
        });
});


module.exports = router;
