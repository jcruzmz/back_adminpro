require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
//Crear el servidor de express
const app = express();

//Configuracion del cors
app.use(cors()); //Es un midleware la palabra use

//Lectura y parseo del boy
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Base de datos mongoose
dbConnection();
//username: mean_user
//eaA3QkQN6ukeMnPD

app.listen(process.env.port, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.port}`)
});