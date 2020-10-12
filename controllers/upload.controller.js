const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const uploadImage = require("../helpers/uploadImage");
const { actualizarImg } = require('../helpers/uploadImage');
const fs = require('fs');

const putSubirArchivo = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            data: null,
            msg: 'El tipo de tabla no existe'
        });
    }
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({
            ok: false,
            data: null,
            msg: 'El archivo no viaja en la petición'
        })
    }
    //Procesar la imagen.....
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            data: null,
            msg: 'El archivo no tiene una extensión valida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        //Actualizar en la bd
        if (actualizarImg(tipo, id, nombreArchivo)) {
            res.status(200).json({
                ok: true,
                data: nombreArchivo,
                msg: 'Archivo subido correctamente'
            });
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error al cargar la imagen'
            });
        }
    });
}
const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathDef = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathDef);
    }
}

module.exports = {
    putSubirArchivo,
    retornaImagen
}