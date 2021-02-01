const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');
const config = require('../config');

// app.get('/',(req, res) =>{
//     res.send('dentro del Login!');
// });

app.use(bodyParser.json());

// const usuarios = [
//     {
//     usuario: "admin",
//     pass: "123456",
//     rol: "rol1"  
//     }
// ]

const usuariosBase = require('./usuario');

usuariosBase.get('/', (req,res) => {
    usuarios.findAll().then(post => {
        res.json(post);
    }).catch(err => {
        res.json(err);
    })
});



function validarUsuarioPass (usuario, pass) {
    const [filtrarUsuario] = usuarios.filter(fila => fila.usuario === usuario && fila.pass === pass)
    console.log(filtrarUsuario);
    if (!filtrarUsuario){
        return false;
    }
    return filtrarUsuario;
};

app.post('/', (req, res) => {
    const { usuario, pass } = req.body
    const validado = validarUsuarioPass (usuario, pass);
    if (!validado) {
        res.json({error: 'No existe el usuario o la contraseña es incorrecta'});
        return;
    }
    
    const token = jwt.sign({
        usuario
    }, config.clave.claveToken);

    res.json({ token })
});

module.exports = app;