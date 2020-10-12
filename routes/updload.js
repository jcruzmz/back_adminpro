/*
Ruta = /api/todo
*/
const { validarJWT } = require('../middlewares/validar-jwt');
const { putSubirArchivo, retornaImagen } = require('../controllers/upload.controller');
const { Router } = require("express");
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, putSubirArchivo);

router.get('/:tipo/:foto', validarJWT, retornaImagen)


module.exports = router;