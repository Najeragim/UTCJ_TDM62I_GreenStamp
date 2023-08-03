const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const alumnoRoutes = require('./routes/alumnoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

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

// Rutas
app.use('/api', alumnoRoutes);
app.use('/api', adminRoutes);
app.use('/api', tutorRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
