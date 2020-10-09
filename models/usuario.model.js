const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido_p: {
        type: String,
    },
    apellido_m: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estatus: {
        type: Number,
        required: true,
        default: 1
    },
    google: {
        type: Boolean,
        default: false
    }
});
//Sobreescribir el nombre de los parametros al retornar
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Usuario', UsuarioSchema);