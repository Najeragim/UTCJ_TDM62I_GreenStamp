const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const alumnoRoutes = require('./routes/alumnoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const claseRoutes = require('./routes/claseRoutes');

const Admin = require('./models/admin');
const Alumno = require('./models/alumno');
const Tutor = require('./models/tutor');

const app = express();

// Conectar con MongoDB Atlas
// Variables
let db_user = 'najeragim';
let db_pass = 'CjJqICV7Xu476Ocw';
let db_cluster = 'cluster0.faeno85.mongodb.net';
let db_name = 'greenstamp';
// Conexión
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@${db_cluster}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Configura CORS como middleware global

// Rutas para las demás funcionalidades (registros, etc.)
app.use('/api', alumnoRoutes);
app.use('/api', adminRoutes);
app.use('/api', tutorRoutes);
app.use('/api', claseRoutes);

// Ruta para autenticar al usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese todos los campos requeridos' });
  }

  try {
    // Buscar al usuario en las colecciones correspondientes según el tipo de usuario
    const admin = await Admin.findOne({ email, password }).exec();
    if (admin) {
      return res.json({ userType: 'admin' });
    }

    // Si no es un admin, busca en la colección de tutores
    const tutor = await Tutor.findOne({ email, password }).exec();
    if (tutor) {
      return res.json({ userType: 'tutor', matricula: tutor.matricula });
    }

    // Si no es un tutor, busca en la colección de alumnos
    const alumno = await Alumno.findOne({ email, password }).exec();
    if (alumno) {
      return res.json({ userType: 'alumno', matricula: alumno.matricula });
    }

    // Si no se encuentra el usuario en ninguna colección, la autenticación falla
    res.status(401).json({ message: 'Credenciales incorrectas' });
  } catch (error) {
    console.error('Error al buscar al usuario:', error);
    res.status(500).json({ message: 'Error Interno del Servidor' });
  }
});



// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
