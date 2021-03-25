const express = require ('express');
const sequelize = require('../database/db');
const router = express.Router();
const pedido = require('../database/models/pedido');
const login = require('./login');

// CREATE
router.post('/', login.auntenticarUsuario, (req,res) =>{
    const nuevoPedido = req.body;
    nuevoPedido.usuario_fk = req.usuario.id;
    nuevoPedido.fechaHora = (new Date());
    pedido.create(
        nuevoPedido, {include: 'itemspedido'}
    ).then(post => {
        res.json(post.id);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// READ /pedidos/:id
router.get('/:id', login.auntenticarAdmin,(req,res) => {
    pedido.findByPk(req.params.id, {include:[
        'usuario',
        'itemspedido']}).then(post => {
        res.json(post);
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

// READ /pedidos/ Leer todos
router.get('/', login.auntenticarAdmin,function(req, res) {
    const query = "Select P.estado, P.fechaHora, P.id, group_concat(concat(I.cantidad,'X ',L.name)) as `itempedido`,P.formaDePago, sum(I.cantidad * L.price) as `Valor`,U.username, U.adress From `pedido` as P inner join `usuario` as U on U.id = P.usuario_fk inner join `itempedido` as I on P.id = I.pedido_fk inner join `platos` as L on L.id = I.platos_fk group by P.id order by P.id DESC;"
    sequelize.query(query).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        res.status(500);
        res.json(err);
    });
});

// UPDATE /pedidos/:id
router.patch('/:id', login.auntenticarAdmin,(req,res) => {
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
        res.status(500);
        res.json(err);
    })
});

// DELETE /pedidos/:id
router.delete('/:id',login.auntenticarAdmin, (req,res) => {
    pedido.destroy({
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