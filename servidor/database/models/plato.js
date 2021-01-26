const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');

class platos extends Model {}

platos.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    imagen: DataTypes.STRING 
}, {
    sequelize,
    timestamps: false,
    tableName: 'platos',
    modelName: 'platos'
});

module.exports = platos;