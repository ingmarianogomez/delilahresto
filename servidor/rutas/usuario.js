const express = require ('express');
const router = express.Router();
const usuarios = require('../database/models/User');

// CREATE
router.post('/', (req,res) =>{
    usuarios.create({
        id: req.body.id,
        username: req.body.username,
        fullname: req.body.fullname,
        mail: req.body.mail,
        phone: req.body.phone,
        adress: req.body.adress,
        pass: req.body.pass,
        rol: req.body.rol
    }).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /usuarios/:id
router.get('/:id', (req,res) => {
    usuarios.findByPk(req.params.id).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /usuarios/ Leer todos
router.get('/', (req,res) => {
    usuarios.findAll().then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;