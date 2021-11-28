const mongoose = require('mongoose');

const Model = mongoose.model(
    "dbVoiture",
    {
        voiture: {
            type: String,
            required: true
        },
        sortie: {
            type: String,
            required: true
        },
        retour: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        genre: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        tel: {
            type: String
        },
        code: {
            type: String,
            required: true
        },
        ville: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        naissance: {
            type: String,
            required: true
        }
    },
    "voiture"
)

module.exports = { Model }