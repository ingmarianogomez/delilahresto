const express = require ('express');
const itempedido = require('../database/models/itempedido');
const router = express.Router();
const pedido = require('../database/models/pedido');
const Users = require('../database/models/User');
const login = require('./login');

// router.get('/', (req ,res ) =>{
//     res.send("Prueba de conexion platos"); 
// });

// CREATE
router.post('/', login.auntenticarUsuario, (req,res) =>{
    const nuevoPedido = req.body;
    nuevoPedido.usuario_fk = req.usuario.id;
    nuevoPedido.fechaHora = (new Date());
    pedido.create(
        nuevoPedido, {include: 'itemspedido'}
        // id: req.body.id,
        // estado: req.body.estado,
        // fechaHora: req.body.fechaHora,
        // formaDePago: req.body.formaDePago
    ).then(post => {
        res.json(post.id);
    }).catch(err => {
        res.json(err);
    })
});

// READ /pedidos/:id
router.get('/:id', (req,res) => {
    pedido.findByPk(req.params.id, {include:[
        'usuario',
        'itemspedido']}).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /pedidos/ Leer todos
router.get('/', (req,res) => {
    // const from = req.params.from;
    // const to = req.params.to;
    // const orderBy = req.params.orderBy;
    const options = {
        attributes: ['id','estado', 'fechaHora'],
        include: [{
            model: Users,
            as: 'usuario',
            attributes: ['username','rol']
        },{
            model: itempedido,
            as: 'itemspedido',
            attributes: ['id','cantidad','platos_fk']
        }]
    }
    // if (from && to){
    //     options.where {

    //     } 
    // }
    pedido.findAll(options).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err    );
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
router.delete('/:id', login.auntenticarAdmin, (req,res) => {
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