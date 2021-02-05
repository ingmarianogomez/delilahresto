const express = require ('express');
const router = express.Router();
const usuarios = require('../database/models/User');
const login = require('./login');

//Consulta para Obtener por ID
// const getUserByID = function (id){
//     usuarios.findByPk(req.params.id).then(post => {
//         res.json(post);
//     }).catch(err => {
//         res.json(err);
// })};


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
router.get('/:id', login.auntenticarUsuario, (req,res) => {
//router.get('/:id', login.auntenticarAdminUser, (req,res) => {
    const user = req.usuario;   
    if (user.rol == "ADMIN" || user.id == req.params.id) {
        usuarios.findByPk(req.params.id).then(post => {
            res.json(post);
        }).catch(err => {
            res.json(err);
        })
    } else {
        res.json({error: 'Solo puede ver tus registros o ser un Admin'})
    }
});

// READ /usuarios/ Leer todos
router.get('/', (req,res) => {
    usuarios.findAll().then(post => {
        res.json(post);
    }).catch(err => {
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
        res.json(err);
    })
});

module.exports = router;
// module.exports = {router, listadoUsuarios};