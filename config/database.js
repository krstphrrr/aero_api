const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.AERO, {
    dialect: 'postgres',
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})
