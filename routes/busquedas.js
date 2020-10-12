/*
Ruta = /api/todo
*/
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentosColecion } = require('../controllers/busquedas.controller');
const { Router } = require("express");

const router = Router();

router.get('/:busqueda', [
    validarJWT
], getBusqueda);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColecion);


module.exports = router;