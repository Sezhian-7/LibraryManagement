const Sequelize = require('sequelize');

const dbConfig = require('./config/config.json')

const dbConnection = async () => {
    const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = dbConnection;