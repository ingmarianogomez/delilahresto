const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');
const config = require('../config');
const usuarios = require('../database/models/User');

router.use(bodyParser.json());

// VALIDAR PASS

router.post('/', (req, res) => {
    const { usuario, pass } = req.body;
    usuarios.findAll().then(todosUsuarios => {
        const validado = todosUsuarios.filter(fila => fila.username === usuario && fila.pass === pass);
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
        }
    }catch (err){
        res.json({error: 'Error al validar usuario'});
    }
}

module.exports = {router, auntenticarUsuario, auntenticarAdmin};