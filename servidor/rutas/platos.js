const express = require ('express');
const router = express.Router();
const plato = require('../database/models/plato');

// router.get('/', (req ,res ) =>{
//     res.send("Prueba de conexion platos"); 
// });

// CREATE
router.post('/', (req,res) =>{
    plato.create({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        imagen: req.body.imagen
    }).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /platos/:id
router.get('/:id', (req,res) => {
    plato.findByPk(req.params.id).then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// READ /platos/ Leer todos
router.get('/', (req,res) => {
    plato.findAll().then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});

// UPDATE /platos/:id
router.patch('/:id', (req,res) => {
    plato.update({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        imagen: req.body.imagen
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

// DELETE /platos/:id
router.delete('/:id', (req,res) => {
    plato.destroy({
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