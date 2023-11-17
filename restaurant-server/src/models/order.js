const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    unique_id: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    propiedades: mongoose.Schema.Types.Mixed, // Campo para propiedades dinámicas
    comments: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
const orderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    customer: {
        type: String,
        required: true,
    },
    cuenta_total: {
        type: Number,
        required: true,
    },
    comandas: [comandaSchema],
});

module.exports = mongoose.model('Order', orderSchema);