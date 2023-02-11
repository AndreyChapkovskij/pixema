const sequelize = require('../db.js')

const { DataTypes } = require('sequelize')

const Movies = sequelize.define('movies', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.STRING, defaultValue: '0' },
  img: { type: DataTypes.STRING, allowNull: false },
  trends: { type: DataTypes.INTEGER, adefaultValue: 0 },
})
const MoviesInfo = sequelize.define('movies_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  imdb: { type: DataTypes.INTEGER, defaultValue: 0 },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  year: { type: DataTypes.INTEGER, defaultValue: 0 },
  released: { type: DataTypes.STRING, allowNull: false },
  boxoffice: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  production: { type: DataTypes.STRING, allowNull: false },
  actors: { type: DataTypes.STRING, allowNull: false },
  director: { type: DataTypes.STRING, allowNull: false },
  writers: { type: DataTypes.STRING, allowNull: false },
})
// const GenresMovie = sequelize.define('movies_genres', {
//   movieId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   genresId: { type: DataTypes.STRING, allowNull: false },
// })
const Genres = sequelize.define('movies_genres', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

Movies.hasOne(MoviesInfo, { as: 'info' })
MoviesInfo.belongsTo(Movies)

Movies.belongsToMany(Genres, { through: 'genresMovies', as: 'genres' })
Genres.belongsToMany(Movies, { through: 'genresMovies' })

// GenresMovie.hasMany(Genres, { as: 'genres' })
// Genres.belongsTo(GenresMovie)

module.exports = {
  Movies,
  MoviesInfo,
  Genres,
  // GenresMovie,
}
