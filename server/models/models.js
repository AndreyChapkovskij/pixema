const sequelize = require('../db.js')

const { DataTypes } = require('sequelize')

const Movies = sequelize.define('movies', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.STRING, defaultValue: '0' },
  img: { type: DataTypes.STRING, allowNull: false },
  imdb: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, defaultValue: 0 },
  trends: { type: DataTypes.INTEGER, adefaultValue: 0 },
})

const GenresMovie = sequelize.define('genresMovies', {
  movieId: { type: DataTypes.INTEGER, primaryKey: true },
  moviesGenreId: { type: DataTypes.INTEGER, primaryKey: true },
})
const Genres = sequelize.define('movies_genres', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

const Info = sequelize.define('movies_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  released: { type: DataTypes.STRING, allowNull: false },
  boxoffice: { type: DataTypes.STRING, allowNull: false },
  production: { type: DataTypes.STRING, allowNull: false },
  actors: { type: DataTypes.STRING, allowNull: false },
  director: { type: DataTypes.STRING, allowNull: false },
  writers: { type: DataTypes.STRING, allowNull: false },
})

const CountryMovie = sequelize.define('countryMovies', {
  movieId: { type: DataTypes.INTEGER, primaryKey: true },
  moviesCountryId: { type: DataTypes.INTEGER, primaryKey: true },
})
const Country = sequelize.define('movies_country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

Movies.belongsToMany(Genres, { through: 'genresMovies', as: 'genres' })
Genres.belongsToMany(Movies, { through: 'genresMovies' })

Movies.belongsToMany(Country, { through: 'countryMovies', as: 'country' })
Country.belongsToMany(Movies, { through: 'countryMovies' })

Movies.hasOne(Info, { as: 'info' })
Info.belongsTo(Movies)

module.exports = {
  Movies,
  Genres,
  GenresMovie,
  Country,
  CountryMovie,
  Info,
}
