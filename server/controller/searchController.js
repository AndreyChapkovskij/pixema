const { Op } = require('sequelize')

const { Movies } = require('../models/models')

class SearchController {
  async getAll(req, res) {
    let { search, page, limit } = req.query

    let movies

    page = page || 1
    limit = limit || 8

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
      })
    } else {
      movies = await Movies.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
      })
    }

    return res.json({ count: movies.length, rows: movies })
  }
}

module.exports = new SearchController()
