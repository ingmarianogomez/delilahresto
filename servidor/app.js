const express = require('express');
const app = express();
const sequelize = require('./database/db');
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');


// setting
const PORT = process.env.PORT || 3000;

//Middleware
//Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.get('/',(req, res) =>{
    res.send('Hola mundo!');
});

app.use('/login', require('./rutas/login'));

app.use('/usuarios', require('./rutas/usuario'));

app.use('/platos', require('./rutas/platos'));

//arrancar el servidor
app.listen(PORT,() =>{
    console.log('Servidor Iniciado en 127.0.0.1:' + PORT);

    //conectar a la base de datos

    // Cambiar "authenticate" por "sync" para crear la tablas automaticamente.
    // Force true: DROP TABLES
    // sequelize.sync({force: false }).then(()=>{
    sequelize.authenticate().then(()=>{
        console.log("Conectado a la base de datos")
    // }).then(async () =>{
    //     const query = 'SELECT * FROM platos';
    //     const [resultados] = await sequelize.query(query, { raw: true });
    //     console.log(resultados);
    }).catch(error =>{
        console.log("Se ha producido un error", error);
    })
});


// VIDEOS ACAMICA
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://root:password@localhost:3307/delilahresto');

//     sequelize.authenticate().then(async () =>{
//     const query = 'SELECT * FROM platos';
//     const resultados = sequelize.query(query, { raw: true });

//     console.log(resultados);
// });


// app.get('/',(req, res) =>{
//     res.send('Hola mundo!');
// });

// app.get('/pedido/:id',(req, res) =>{
//     res.send('Hola mundo!');
// });

// app.get('/error',(req, res) =>{
//     res.status (500);
//     res.json ({error:'Hubo un error :('});
// });
