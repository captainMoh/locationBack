const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { Model } = require('../model/model');

router.get('/', (req, res) => {
    Model.find((err, docs) => {
        if(!err) res.send(docs)
        else console.log(`Error to get data: ${err}`);
    })
})

router.post('/', (req, res) => {
    const newRecord = new Model({
        voiture: req.body.voiture,
        sortie: req.body.sortie,
        retour: req.body.retour
    })

    newRecord.save((err, docs) => {
        if(!err) res.send(docs)
        else console.log(`Error creating new data: ${err}`);
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        sortie: req.body.sortie,
        retour: req.body.retour
    }

    Model.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Update error : ${err}`);
        }
    )
})

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    Model.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Delete error : ${err}`);
        }
    )
})

module.exports = router