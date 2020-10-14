const { response } = require("express");
const Hospital = require('../models/hospital.model');

const getHospitales = async(req, res = response) => {
    try {
        const hospitales = await (await Hospital.find().populate('usuario', 'nombre img')).filter(hospital => hospital.estatus != 0);
        res.status(200).json({
            ok: true,
            data: hospitales,
            msg: 'Ok',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: 'Error interno del servidor',
        });
    }
};

const getHospitalesById = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        data: null,
        msg: 'Ok',
    });
};

const postHospitales = async(req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });
    try {
        const hospitalDB = await hospital.save();
        res.status(200).json({
            ok: true,
            data: hospitalDB,
            msg: 'Ok',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: null,
            msg: 'Error en el servidor',
        });
    }
};

const putHospitales = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    const { nombre } = req.body;
    try {
        const hospitaldb = await Hospital.findById(id);
        if (!hospitaldb) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'Hospital no encontrado',
            });
        }
        hospitaldb.usuario = uid;
        hospitaldb.nombre = nombre;
        const hospitalF = await hospitaldb.save();
        res.status(200).json({
            ok: true,
            data: hospitalF,
            msg: 'Hospital actualizado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            data: null,
            msg: 'Error interno del servidor',
        });
    }
};

const deleteHospitales = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitaldb = await Hospital.findById(id);
        if (!hospitaldb) {
            res.status(400).json({
                ok: false,
                data: null,
                msg: 'Hospital no encontrado',
            });
        }
        hospitaldb.estatus = 0;
        hospitaldb.usuario = uid;
        const result = await hospitaldb.save();
        res.status(200).json({
            ok: true,
            data: result,
            msg: 'Hospital borrado correctamente',
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            data: null,
            msg: 'Error interno del servidor',
        });
    }
};

module.exports = {
    getHospitales,
    getHospitalesById,
    postHospitales,
    putHospitales,
    deleteHospitales
}