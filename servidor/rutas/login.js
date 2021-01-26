const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');

const usuarios = [{
    usuario = "admin",
    pass = "123456"
}]

function validarUsuarioPass (usuario, pass) {
    const filtrarUsuario = [],
    filtrarUsuario = usuarios.filter(fila => fila.usuario === usuario && fila.pass === pass)
    if (filtrarUsuario.isEmpty){
        return false;
    }
    return filtrarUsuario;
}

app.post('/',(req,res) =>{
    const {usuario, pass} = req.body
    const validado = validarUsuarioPass (usuario, pass);
    if (!validado) {
        res.json({error: 'No existe el usuario o la contraseña es incorrecta'});
        return;
    }

    const token = jwt.sign({
        usuario
    }, 'secretoJWT');

    res.json({ token })
});