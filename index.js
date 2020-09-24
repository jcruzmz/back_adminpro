require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
//Crear el servidor de express
const app = express();

//Configuracion del cors
app.use(cors()); //Es un midleware la palabra use

// Base de datos mongoose
dbConnection();
//username: mean_user
//eaA3QkQN6ukeMnPD
//Rutas
app.get('/', (req, res) => {
    res.status(202).json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.port, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.port}`)
});