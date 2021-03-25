const express = require ('express');
const router = express.Router();
const usuarios = require('../database/models/User');
const login = require('./login');


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
        res.status(500);
        res.json(err);
    })
});

// READ /usuarios/:id
router.get('/:id', login.auntenticarUsuario, (req,res) => {
    const user = req.usuario;   
    if (user.rol == "ADMIN" || user.id == req.params.id) {
        usuarios.findByPk(req.params.id).then(post => {
            res.json(post);
        }).catch(err => {
            res.json(err);
        })
    } else {
        res.status(401);
        res.json({error: 'Solo puede ver tus registros o ser un Admin'})
    }
});

// READ /usuarios/ Leer todos
router.get('/', login.auntenticarAdmin, (req,res) => {
    usuarios.findAll().then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// UPDATE /usuarios/:id
router.patch('/:id', login.auntenticarAdmin, (req,res) => {
    usuarios.update({
        id: req.body.id,
        username: req.body.username,
        fullname: req.body.fullname,
        mail: req.body.mail,
        phone: req.body.phone,
        adress: req.body.adress,
        pass: req.body.pass,
        rol: req.body.rol
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

module.exports = router;