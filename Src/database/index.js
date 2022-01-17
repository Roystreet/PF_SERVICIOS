require('dotenv').config();
console.log(process.env.USER, 'aaaaa');
const { Sequelize } = require('sequelize');
console.log(process.env.DB_NAME, 'process');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
	dialect: 'postgres',
	host: 'localhost',
	logging: false
});

module.exports = sequelize;
