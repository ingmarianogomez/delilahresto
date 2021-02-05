const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');
const config = require('../config');
const usuarios = require('../database/models/User');
// const traerUsuarios = require('./usuario');

router.use(bodyParser.json());


// Obtenerlo el listado de usuarios desde aca
// function obtenerUsuarios(){
//     const usuarios = fetch('http://127.0.0.1:3000/usuarios')
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             return data;
//         })
//         .catch(error => {
//             return error;
//         });
// };

// obtenerUsuarios();


// Traerlo segun calculado en Usuario.js
// console.log (traerUsuarios.listadoUsuarios());

const usuarios = [
    {
        id: "1",
        usuario: "admin",
        pass: "123456",
        rol: "ADMIN"  
    },
    {
        id: "2",
        usuario: "user",
        pass: "123456",
        rol: "USUARIO"  
    }
]

// VALIDAR PASS

function validarUsuarioPass (usuario, pass) {
    usuarios.findAll(req.params.id).then(todosUsuarios => {
        const filtrarUsuario = todosUsuarios.filter(fila => fila.usuario === usuario && fila.pass === pass);    
            res.json(post);
        
        if (!filtrarUsuario){
            return false;
        }
//    return filtrarUsuario;
        }).catch(err => {
            res.json(err);
        });
};



router.post('/', (req, res) => {
    const { usuario, pass } = req.body;
    //const validado = validarUsuarioPass (usuario, pass);
    usuarios.findAll().then(todosUsuarios => {
        const validado = todosUsuarios.filter(fila => fila.usuario === usuario && fila.pass === pass);
        console.log(validado);
        if (!validado) {
            res.json({error: 'No existe el usuario o la contraseña es incorrecta'});
            return;
        }

        const token = jwt.sign({
            validado
        }, config.clave.claveToken);

        res.json({ token })
        
        }).catch(err => {
            res.json(err);
        });
});

const auntenticarUsuario = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.headers.authorization;
        const verificarToken = jwt.verify(token, config.clave.claveToken);
        if (verificarToken){
            req.usuario = verificarToken.validado[0];
            return next();
        }
    }catch (err) {
        res.json({error: 'Error al validar usuario'});
    }
}

// VALIDAR ADMIN

const auntenticarAdmin = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.headers.authorization;
        const verificarToken = jwt.verify(token, config.clave.claveToken);
        if (verificarToken){
            const usuario = verificarToken.validado[0];
            if (usuario.rol == 'ADMIN'){
                req.usuario = usuario;
                return next();
            }else{
                res.json({error: 'Debes ser ADMIN para realizar esta accion'})
            }
        }11
    }catch (err){
        res.json({error: 'Error al validar usuario'});
    }
}

module.exports = {router, auntenticarUsuario, auntenticarAdmin};
