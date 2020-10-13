/*
Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    validarCampos
], login)

router.post('/google', [
    check('token', 'El token es requerido').not().isEmpty(),
    validarCampos
], loginGoogle)


module.exports = router;