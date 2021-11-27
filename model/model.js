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
        }
    },
    "voiture"
)

module.exports = { Model }