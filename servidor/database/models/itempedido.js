const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');
const platos = require('./plato');

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

itempedido.belongsTo(platos,{ foreignKey: "platos_fk", targetKey:"id", as: "platos"});

module.exports = itempedido;