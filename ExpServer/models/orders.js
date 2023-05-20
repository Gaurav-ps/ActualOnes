const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Orders = sequelize.define('orders',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    table:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Orders;