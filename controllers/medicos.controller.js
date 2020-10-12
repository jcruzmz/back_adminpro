const { response } = require("express");
const Medico = require("../models/medico.model");

const getMedicos = async(req, res = response) => {
    try {
        const medicos = await (await Medico.find()
                .populate('user', 'nombre img')
                .populate('hospital', 'nombre img'))
            .filter(medico => medico.status != 0);
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
    res.status(200).json({
        ok: true,
        data: null,
        msg: 'Ok',
    });
};

const deleteMedicos = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        data: null,
        msg: 'Ok',
    });
};

module.exports = {
    getMedicos,
    getMedicosById,
    postMedicos,
    putMedicos,
    deleteMedicos
}