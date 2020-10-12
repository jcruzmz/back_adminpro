const { response } = require("express");
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
const getBusqueda = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
        msg: 'Busqueda correcta'
    });
}

const getDocumentosColecion = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                data: null,
                msg: 'La tabla no se encuentra'
            });
    }
    res.status(200).json({
        ok: true,
        data: data,
        msg: 'Busqueda correcta'
    });
}

module.exports = {
    getBusqueda,
    getDocumentosColecion
}