const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estatus: {
        type: Number,
        default: 1
    }
}, { collection: 'hospitales' });
//Sobreescribir el nombre de los parametros al retornar
HospitalSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Hospital', HospitalSchema);