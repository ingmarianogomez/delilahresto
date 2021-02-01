const express = require ('express');
const router = express.Router();
const pedido = require('../database/models/pedido')

// router.get('/', (req ,res ) =>{
//     res.send("Prueba de conexion platos"); 
// });

// CREATE
router.post('/', (req,res) =>{
    pedido.create({
        id: req.body.id,
        estado: req.body.estado,
        fechaHora: req.body.fechaHora,
        formaDePago: req.body.formaDePago,
        usuario_fk: req.body.usuario_fk
    }).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /pedidos/:id
router.get('/:id', (req,res) => {
    pedido.findByPk(req.params.id).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /pedidos/ Leer todos
router.get('/', (req,res) => {
    pedido.findAll().then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// UPDATE /pedidos/:id
router.patch('/:id', (req,res) => {
    pedido.update({
        id: req.body.id,
        estado: req.body.estado,
        fechaHora: req.body.fechaHora,
        formaDePago: req.body.formaDePago,
        usuario_fk: req.body.usuario_fk
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
});

// DELETE /pedidos/:id
router.delete('/:id', (req,res) => {
    pedido.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;