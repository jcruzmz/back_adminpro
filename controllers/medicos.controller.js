const { response } = require("express");
const Medico = require("../models/medico.model");

const getMedicos = async(req, res = response) => {
    try {
        const medicos = await (await Medico.find()
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img'))
            .filter(medico => medico.estatus != 0);
        res.status(200).json({
            ok: true,
            data: medicos,
            msg: 'Ok',
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            data: 'Error interno del servidor',
            msg: 'Ok',
        });
    }
};

const getMedicosById = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        data: null,
        msg: 'Ok',
    });
};

const postMedicos = async(req, res = response) => {
    const uid = req.uid;
    const medicoDB = new Medico({ usuario: uid, ...req.body });
    try {
        const medico = await medicoDB.save();
        res.status(200).json({
            ok: true,
            data: medico,
            msg: 'Ok',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            data: null,
            msg: 'Error del servidor',
        });
    }
};

const putMedicos = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    const { nombre, hospital } = req.body;
    try {
        const medicodb = await Medico.findById(id);
        if (!medicodb) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'Medico no encontrado',
            });
        }
        medicodb.nombre = nombre;
        medicodb.hospital = hospital;
        medicodb.usuario = uid;
        const result = await medicodb.save();
        res.status(200).json({
            ok: true,
            data: result,
            msg: 'Medico actualizado con exito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            data: null,
            msg: 'Error del servidor',
        });
    }
};

const deleteMedicos = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicodb = await Medico.findById(id);
        if (!medicodb) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'Medico no encontrado',
            });
        }
        medicodb.estatus = 0;
        medicodb.usuario = uid;
        const result = await medicodb.save();
        res.status(200).json({
            ok: true,
            data: result,
            msg: 'Medico borrado con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            data: null,
            msg: 'Error del servidor',
        });
    }
};

module.exports = {
    getMedicos,
    getMedicosById,
    postMedicos,
    putMedicos,
    deleteMedicos
}