const { response } = require("express");
const { serverError } = require("../beans/msg");
const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        //Verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                data: null,
                msg: 'Email no valido'
            })
        }
        //Verificar contraseña
        const validPassword = await bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'Contraseña no valida'
            })
        }
        //Generar un token
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: serverError
        })
    }
}

module.exports = {
    login
}