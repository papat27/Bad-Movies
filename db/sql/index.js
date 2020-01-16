//const mysql = require('mysql');
//const mysqlConfig = require('../../konfig.js');
const sequelize = require('sequelize');
const { host, user, password, database } = require('../../konfig.js');

//const connection = mysql.createConnection(mysqlConfig);

const connection = new sequelize(database, user, password, {
  host: host,
  dialect: 'mysql'
});

module.exports = connection;