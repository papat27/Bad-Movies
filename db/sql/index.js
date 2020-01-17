//const mysql = require('mysql');
//const mysqlConfig = require('../../konfig.js');
const sequelize = require('sequelize');
const { host, user, password, database } = require('../../konfig.js');

//const connection = mysql.createConnection(mysqlConfig);

const connection = new sequelize(database, user, password, {
  host: host,
  dialect: 'mysql'
});

let Favorite = connection.define('favorites', {
  title: {
    type: sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  movie_year: {
    type: sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  rating: {
    type: sequelize.DECIMAL,
    allowNull: true,
    defaultValue: 0
  },
  tmdb_id: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  poster_path: {
    type: sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
});
//uncomment this to test that movie.controller.saveMovie is actually able to insert a row
//also to wipe the table
Favorite.sync({force: true});
//use this for deployment
//Favorite.sync();

module.exports.connection = connection;
module.exports.Favorite = Favorite;