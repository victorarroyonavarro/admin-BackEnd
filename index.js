require('dotenv').config();

const express = require('express');

const cors = require('cors');

const {dbConnection} = require('./database/config');

const app = express();

// Configurar Cors
app.use(cors());

// ----------Base de Datos
dbConnection();

// 1. Rutas
app.get('/', (req, res) => {
    res.json({ok: true, msg: "hola mundo"})
});


// 2. Crear el servidor Express
app.listen(process.env.port, () => {
    console.log("Esta corriendo el puerto: " + process.env.port)
});
