/*
Ruta = /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require("../controllers/medicos.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    // validarJWT
], getMedicos);

router.post('/', [
    validarJWT,
    check('hospital', 'El hospital es requerido').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital debe ser valido').isMongoId(),
    validarCampos
], postMedicos);

router.put('/:id', [
    validarJWT,
    check('hospital', 'El hospital es requerido').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital debe ser valido').isMongoId(),
    validarCampos
], putMedicos, );

router.delete('/:id', [
    validarJWT
], deleteMedicos);


module.exports = router