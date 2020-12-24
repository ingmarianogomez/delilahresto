const express = require('express');

const app = express();

app.get('/',(req, res) =>{
    res.send('Hola mundo!');
});

app.get('/error',(req, res) =>{
    res.status (500);
    res.json ({ error:'Hubo un error :('});
});

app.listen(3000,() =>{
    console.log('Servidor Iniciado');
});