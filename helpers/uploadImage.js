const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImg = async(path) => {
    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImg = async(tipo, id, nombreArchivo) => {
    try {
        switch (tipo) {
            case 'medicos':
                const medico = await Medico.findById(id);
                if (!medico) {
                    return false;
                }
                borrarImg(`./uploads/medicos/${medico.img}`);
                medico.img = nombreArchivo;
                await medico.save();
                return true;
            case 'hospitales':
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    return false;
                }
                borrarImg(`./uploads/hospitales/${hospital.img}`);
                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            case 'usuarios':
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    return false;
                }
                borrarImg(`./uploads/usuarios/${usuario.img}`);
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    actualizarImg
}