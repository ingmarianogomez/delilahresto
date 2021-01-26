const Sequelize = require('sequelize');
// const database = require('../config');

const sequelize = new Sequelize(
    "delilah_resto",
    "root",
    "",{
        host: "localhost",
        dialect:"mysql",
        port: "3307"
    }
);
  
module.exports = sequelize;