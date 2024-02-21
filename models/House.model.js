const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String], // Lista de comodidades
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de usuarios
        required: true,
    },
    images: {
        type: [String], // Lista de URLs de imágenes
    },
    
});

const House = mongoose.model('House', houseSchema);
module.exports = House;