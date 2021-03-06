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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/updload'));
app.use('/api/login', require('./routes/auth'));

// Base de datos mongoose
dbConnection();
//username: mean_user
//eaA3QkQN6ukeMnPD

//Directorio publico
app.use(express.static('public'));

app.listen(4400, () => {
    console.log(`Servidor corriendo en http://localhost:4400`)
});