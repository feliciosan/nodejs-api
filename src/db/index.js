const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.name, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

const startModels = require('../models');

startModels(sequelize, DataTypes);

module.exports = sequelize;
