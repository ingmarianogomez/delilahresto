const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');

class pedido extends Model {}

pedido.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: DataTypes.STRING,
    fechaHora: DataTypes.DATE,
    //     {
    //     type: DataTypes.DATE,
    //     timestamps: true
    // },
    formaDePago: DataTypes.STRING,
    usuario_fk: {
        type: DataTypes.NUMBER
        // foreingKey: true
    }
},{
    sequelize,
    timestamps: false,
    tableName: 'pedido',
    modelName: 'pedido'
})

module.exports = pedido;