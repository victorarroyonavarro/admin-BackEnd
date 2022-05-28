require('dotenv').config();

const express = require('express');

const cors = require('cors');

const {dbConnection} = require('./database/config');

const app = express();

// Configurar Cors
app.use(cors());

// Lectura y parseo Body

app.use(express.json());

// ----------Base de Datos
dbConnection();

// 1. Rutas

app.use('/api/usuarios',require('./routes/usuarios.route'));
app.use('/api/login',require('./routes/auth.route'));
app.use('/api/hospitales',require('./routes/hospitales.route'));
app.use('/api/medicos',require('./routes/medicos.route'));
app.use('/api/todos',require('./routes/busquedas.route'));
app.use('/api/uploads',require('./routes/uploads.route'));

// 2. Crear el servidor Express
app.listen(process.env.port, () => {
    console.log("Esta corriendo el puerto: " + process.env.port)
});
