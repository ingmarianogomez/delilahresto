const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');

class itempedido extends Model {}

itempedido.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    pedido_fk: {
        type: DataTypes.NUMBER
        // foreingKey: true
    },
    cantidad: DataTypes.NUMBER,
    platos_fk: {
        type: DataTypes.NUMBER
        // foreingKey: true
    }
},{
    sequelize,
    timestamps: false,
    tableName: 'itempedido',
    modelName: 'itempedido'
})

module.exports = itempedido;