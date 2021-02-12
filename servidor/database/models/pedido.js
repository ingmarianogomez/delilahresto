const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../db');
const itempedido = require ('./itempedido');
const Users = require('./User');

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
    usuario_fk: DataTypes.NUMBER 
},{
    sequelize,
    timestamps: false,
    tableName: 'pedido',
    modelName: 'pedido'
});

pedido.belongsTo(Users,{ foreignKey: "usuario_fk", targetKey:"id", as: "usuario"});
pedido.hasMany(itempedido,{ foreignKey: "pedido_fk", targetKey:"id", as: "itemspedido"});

module.exports = pedido;