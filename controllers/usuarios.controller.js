const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const { serverError, update, deleteR, create, notFound } = require('../beans/msg');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const [usuarios, total] = await Promise.all([
            Usuario
            .find({}, 'nombre email img role google estatus')
            .skip(desde)
            .limit(5),
            Usuario.count()
        ]);
        res.status(200).json({
            ok: true,
            data: usuarios,
            msg: 'Ok',
            total: total
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: serverError
        })
    }
};

const getUsuariosById = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                data: null,
                msg: notFound
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: serverError
        })
    }
};

const postUsuarios = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'El correo ya existe, favor de validarlo'
            })
        } else {
            const usuario = new Usuario(req.body);
            //Encriptar la contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);
            //Guardar usuario
            await usuario.save();
            //Generar un token
            const token = await generarJWT(usuario.id);
            res.status(200).json({
                ok: true,
                data: usuario,
                msg: create,
                token: token,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            data: null,
            msg: serverError
        });
    }
};

const putUsuarios = async(req, res = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                data: null,
                msg: notFound
            })
        }
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({ email: req.body.email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    data: null,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            data: usuarioActualizado,
            msg: 'Usuario actualizado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: 'Internal server error'
        });
    }
};

const deleteUsuarios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                data: null,
                msg: 'Usuario no encontrado'
            })
        }
        const campos = {
            estatus: 0
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        return res.status(200).json({
            ok: true,
            data: usuarioActualizado,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: serverError
        });
    }
};

module.exports = {
    getUsuarios,
    getUsuariosById,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}