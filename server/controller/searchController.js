const { Op } = require('sequelize')

const { Movies, Genres } = require('../models/models')

class SearchController {
  async getAll(req, res) {
    let { search, page, limit } = req.query

    let movies

    page = page || 1
    limit = limit || 6

    let offset = page * limit - limit
    if (search) {
      movies = await Movies.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          title: {
            [Op.or]: [
              { [Op.substring]: search },
              { [Op.substring]: search[0].toUpperCase() },
            ],
          },
        },
        limit,
        offset,
        include: [
          {
            model: Genres,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
            as: 'genres',
          },
        ],
      })
    } else {
      movies = await Movies.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
        include: [
          {
            model: Genres,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
            as: 'genres',
          },
        ],
      })
    }

    return res.json({ count: movies.length, rows: movies })
  }
}

module.exports = new SearchController()
