/*
Ruta = /api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require("../controllers/hospitales.controller");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    // validarJWT
], getHospitales);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postHospitales);

router.put('/:id', [
    // validarJWT,
], putHospitales, );

router.delete('/:id', [
    // validarJWT
], deleteHospitales);


module.exports = router