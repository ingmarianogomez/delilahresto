const express = require ('express');
const router = express.Router();
const itempedido = require('../database/models/itempedido')
const login = require('./login');

// router.get('/', (req ,res ) =>{
//     res.send("Prueba de conexion platos"); 
// });

// CREATE
router.post('/', login.auntenticarUsuario, (req,res) =>{
    itempedido.create({
        id: req.body.id,
        pedido_fk: req.body.pedido_fk,
        cantidad: req.body.cantidad,
        platos_fk: req.body.platos_fk
    }).then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// READ /itempedido/:id
router.get('/:id', login.auntenticarAdmin,(req,res) => {
    itempedido.findByPk(req.params.id).then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// READ /itempedido/ Leer todos
router.get('/', login.auntenticarAdmin, (req,res) => {
    itempedido.findAll()
    .then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// UPDATE /itempedido/:id
router.patch('/:id', login.auntenticarAdmin, (req,res) => {
    itempedido.update({
        id: req.body.id,
        pedido_fk: req.body.pedido_fk,
        cantidad: req.body.cantidad,
        platos_fk: req.body.platos_fk
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

// DELETE /itempedido/:id
router.delete('/:id', login.auntenticarAdmin, (req,res) => {
    itempedido.destroy({
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