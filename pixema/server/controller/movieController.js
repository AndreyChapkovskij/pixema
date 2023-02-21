const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')

const {
  Movies,
  Genres,
  GenresMovie,
  Country,
  CountryMovie,
  Info,
} = require('../models/models')

class MovieController {
  ///////////////////////////////////////
  async getAll(req, res) {
    let {
      trends,
      limit,
      page,
      order,
      sortBy,
      search,
      shortSearch,
      genres,
      groupByYear,
      groupByRating,
      country,
      favoritersId,
    } = req.query

    const filterGenres = () => {
      if (genres) {
        return {
          id: {
            [Op.or]: [genres.split(',')],
          },
        }
      }
    }
    const filterCountry = () => {
      if (country) {
        return {
          name: country,
        }
      }
    }

    const filterMovies = () => {
      let filter = {}
      if (trends) {
        filter.trends = trends
      }
      if (groupByRating) {
        filter.rating = { [Op.between]: groupByRating.split(',') }
      }
      if (favoritersId) {
        filter.id = favoritersId.split(',')
      }
      if (groupByYear) {
        filter.year = { [Op.between]: groupByYear.split(',') }
      }

      if (search) {
        filter.title = {
          [Op.or]: [
            { [Op.substring]: search },
            { [Op.substring]: search[0].toUpperCase() },
          ],
        }
      }
      if (shortSearch) {
        filter.title = shortSearch
      }
      // if (country) {
      //   filter.country = country
      // }
      return filter
    }

    const sort = () => {
      if (sortBy) {
        return [[sortBy, order || 'desc']]
      }
    }

    page = page || 1
    limit = limit || 12
    let offset = page * limit - limit

    let movies = await Movies.findAll({
      where: filterMovies(),
      order: sort(),
      limit,
      offset,
      include: [
        {
          model: Genres,
          where: filterGenres(),
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] },
          as: 'genres',
        },
        {
          model: Country,
          where: filterCountry(),
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] },
          as: 'country',
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })

    // need to change //
    let count = await Movies.findAll({
      where: filterMovies(),
      order: sort(),
      include: [
        {
          model: Genres,
          where: filterGenres(),
          through: { attributes: [] },
          as: 'genres',
        },
        {
          model: Country,
          where: filterCountry(),
          through: { attributes: [] },
          as: 'country',
        },
      ],
    })
    // need to change //

    return res.json({
      count: count.length,
      page,
      limit,
      rows: movies,
    })
  }

  async getOne(req, res, next) {
    const { id } = req.params
    const movie = await Movies.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Genres,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] },
          as: 'genres',
        },
        {
          model: Country,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] },
          as: 'country',
        },
        {
          model: Info,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'infoId', 'id', 'movieId'],
          },
          as: 'info',
        },
      ],
    })
    return res.json(movie)
  }

  async create(req, res, next) {
    try {
      console.log(req.body)
      let {
        title,
        rating,
        imdb,
        duration,
        description,
        year,
        released,
        boxoffice,
        country,
        production,
        actors,
        director,
        writers,
        trends,
        genres,
      } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const movie = await Movies.create({
        title,
        rating,
        imdb,
        duration,
        description,
        year,
        trends,
        img: fileName,
      })

      const info = await Info.create({
        released,
        boxoffice,
        production,
        actors,
        director,
        writers,
        movieId: movie.id,
        infoId: movie.id,
      })

      if (genres) {
        genres = JSON.parse(genres)

        genres.forEach((genre) => {
          GenresMovie.create({ movieId: movie.id, moviesGenreId: genre })
        })
      }
      if (country) {
        country = JSON.parse(country)

        country.forEach((item) => {
          CountryMovie.create({ movieId: movie.id, moviesCountryId: item })
        })
      }

      return res.json(movie)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new MovieController()

// if (groupByYear) {
//   movies = await Movies.findAll({
//     where: { year: { [Op.between]: groupByYear.split(',') } },
//     limit,
//     offset,
//     include: [
//       {
//         model: Genres,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//         through: { attributes: [] },
//         as: 'genres',
//       },
//     ],
//   })
// } else if (groupByRating) {
//   movies = await Movies.findAll({
//     where: { rating: { [Op.between]: groupByRating.split(',') } },
//     limit,
//     offset,
//     include: [
//       {
//         model: Genres,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//         through: { attributes: [] },
//         as: 'genres',
//       },
//     ],
//   })
// } else if (genre) {
//   movies = await Movies.findAll({
//     limit,
//     offset,
//     include: [
//       {
//         model: Genres,
//         where: {
//           id: {
//             [Op.or]: [genre.split(',')],
//           },
//         },
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//         through: { attributes: [] },
//         as: 'genres',
//       },
//     ],
//   })

//   movies.filter((movie) => {})
// } else if (search) {
//   movies = await Movies.findAll({
//     where: {
//       title: {
//         [Op.or]: [
//           { [Op.substring]: search },
//           { [Op.substring]: search[0].toUpperCase() },
//         ],
//       },
//     },
//     limit,
//     offset,
//     include: [
//       {
//         model: Genres,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//         through: { attributes: [] },
//         as: 'genres',
//       },
//     ],
//   })
// } else if (sortBy && order) {
//   movies = await Movies.findAll({
//     order: [[sortBy, order]],
//     limit,
//     offset,
//     include: [
//       {
//         model: Genres,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//         through: { attributes: [] },
//         as: 'genres',
//       },
//     ],
//   })
// }
