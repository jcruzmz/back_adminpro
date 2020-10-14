const { response } = require("express");
const { serverError } = require("../beans/msg");
const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const { generarJWT } = require("../helpers/jwt");
const { verify } = require('../helpers/google-verify');

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

const loginGoogle = async(req, res = response) => {
    const token_google = req.body.token;
    try {
        const { name, email, picture } = await verify(token_google);
        const usuariodb = await Usuario.findOne({ email });
        let usuario;
        if (!usuariodb) {
            usuario = new Usuario({
                nombre: name,
                email,
                img: picture,
                password: '@@',
                google: true
            })
        } else {
            // Existe usuario
            usuario = usuariodb;
            usuario.google = true;
        }
        await usuario.save();
        //Generar un token
        const token = await generarJWT(usuariodb.id);
        res.status(200).json({
            ok: true,
            msg: 'Google Signin',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}

const renewToken = async(req, res = response) => {
    const id = req.uid;
    //Generar un token
    const token = await generarJWT(id);
    try {
        res.status(200).json({
            ok: true,
            msg: 'renew token',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        })
    }
}
module.exports = {
    login,
    loginGoogle,
    renewToken
}