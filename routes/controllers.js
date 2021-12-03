const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { Model } = require('../model/model');


/*const run = async () => {
    const user = await Model.create({
        voiture: "peugeot 208",
        location: [
            {   
                "sortie": "2021-01-01",
                "retour": "2021-01-8",
                "genre": "homme",
                "prenom": "Mohamed-Amine",
                "nom": "RHARRABTI",
                "email": "aichoun026@gmail.com",
                "tel": "0621125478",
                "code": "60000",
                "ville": "oujda",
                "adresse": "rue aghdferyf",
                "naissance": "2021_12-10"
            }
        ]
    })
    console.log(user);
}
run();*/

router.get('/', (req, res) => {
    Model.find((err, docs) => {
        if(!err) res.send(docs)
        else console.log(`Error to get data: ${err}`);
    })
})

router.post('/', (req, res) => {
    const newRecord = new Model({
        voiture: req.body.voiture,
        location: req.body.location
    })

    newRecord.save((err, docs) => {
        if(!err) res.json(docs)
        else console.log(`Error creating new data: ${err}`);
    })

})

router.patch('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        location: req.body.location
    }

    Model.findByIdAndUpdate(
        req.params.id,
        { $addToSet: updateRecord },
        { new: true, upsert: true },
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Update error : ${err}`);
        }
    )
})

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        location: req.body.location
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