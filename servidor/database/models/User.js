const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    mail: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    adress: DataTypes.STRING,
    pass: DataTypes.STRING,
    rol: DataTypes.STRING
},{
    sequelize,
    timestamps: false,
    tableName: 'usuario',
    modelName: 'usuario'
})

module.exports = Users;