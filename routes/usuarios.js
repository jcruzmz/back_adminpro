/*
Ruta = /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT
], getUsuarios);
//middleware express validator
router.post('/', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato adecuado').isEmail(),
    validarCampos
], postUsuarios);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato adecuado').isEmail(),
    check('role', 'El role es obligatorio'),
    validarCampos
], putUsuarios, );

router.delete('/:id', [validarJWT], deleteUsuarios);

module.exports = router;