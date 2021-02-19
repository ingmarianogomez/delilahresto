const express = require('express');
const app = express();
const sequelize = require('./database/db');
const bodyParser = require ('body-parser');

// setting
const PORT = process.env.PORT || 3000;

//No estoy seguro para que usarlo aca
app.use(bodyParser.json());

//Middleware
//Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.get('/',(req, res) =>{
    res.send('Hola mundo!');
});

app.use('/login', require('./rutas/login').router);

app.use('/usuarios', require('./rutas/usuario'));

app.use('/platos', require('./rutas/platos'));

app.use('/pedidos', require('./rutas/pedidos'));

app.use('/itempedidos', require('./rutas/itempedidos'));

//arrancar el servidor
app.listen(PORT,() =>{
    console.log('Servidor Iniciado en 127.0.0.1:' + PORT);
    sequelize.authenticate().then(()=>{
        console.log("Conectado a la base de datos")
    }).catch(error =>{
        console.log("Se ha producido un error", error);
    })
});