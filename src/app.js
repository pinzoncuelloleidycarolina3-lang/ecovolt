require('dotenv').config();

const express = require('express');
const sequelize = require('../Config/database');

const Usuario = require('./models/Usuario');
const Estacion = require('./models/Estacion');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});