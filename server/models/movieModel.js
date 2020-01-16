//Select one db to work with:

//For SQL
//const sqlDb = require('../../db/sql');
const Sequelize = require('sequelize')
const sequelize = require('../../db/sql');
//For Mongo
// const mongoDb = require('../../db/mongodb')

//const { host, user, password, database } = require('../../kongfig.js');
//console.log(sequelize);
let Favorite = sequelize.define('favorites', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  rating: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    defaultValue: 0
  },
  tmdb_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});
//uncomment this to test that movie.controller.saveMovie is actually able to insert a row
//Favorite.sync({force: true});

module.exports = {
  saveMovie: function(movie) {
    let options = {
      where: {
        tmdb_id: movie.tmdb_id
      },
      defaults: {
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        tmdb_id: movie.tmdb_id
      }
    }
    //error somewhere here?
    return Favorite.findOrCreate(options)
      // .then((data) => {
      //   console.log(movie.tmdb_id);
      //   return Favorite.findAll({where: {tmdb_id: movie.tmdb_id}});
      // })
      // .catch((err) => {
      //   console.error('this error is in findorcreate', err);
      //   throw new Error('dang...gn');
      // })
      // .then((data) => {
      //   console.log(data);
      //   return data;
      // })
      // .catch((err) => {
      //   console.error('this error is from finding the same movie', err);
      //   throw new Error('sheeeeeee');
      // })
  },

  deleteMovie: function(movie) {
    let options = {
      where: {
        tmdb_id: movie.tmdb_id
      }
    }
    return Favorite.destroy(options);
  },

  getFavorites: function() {
    return Favorite.findAll();
  }
}