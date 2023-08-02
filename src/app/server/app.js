const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Conectar con MongoDB Atlas

// el usuario es (example) la contraseña (123) el cluster es (cluster0) la base de datos es (integra) no se crea una coleccion ya que la va a crear automaticamente 
mongoose.connect('mongodb+srv://example:123@cluster0.us5vr3n.mongodb.net/integra', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Definir el modelo del usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Configura CORS como middleware global

// Rutas
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  const newUser = new User({ email, password });

  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'User registered successfully.' });
    })
    .catch((error) => {
      console.error('Error saving user to the database:', error);
      res.status(500).json({ message: 'Internal server error.' });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
