const { Op } = require('sequelize')

const { Genres } = require('../models/models')

class GenresController {
  async getAll(req, res) {
    let { search, limit, page, without } = req.query

    let genres

    let genresId = []

    without.split(',').forEach((id) => {
      genresId.push({ [Op.ne]: Number(id) })
    })

    console.log(genresId)

    page = page || 1
    limit = limit || 6

    let offset = page * limit - limit
    if (search) {
      genres = await Genres.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          name: {
            [Op.or]: [
              { [Op.substring]: search },
              { [Op.substring]: search[0].toUpperCase() },
            ],
          },
          id: {
            [Op.and]: genresId,
          },
        },
        limit,
        offset,
      })
    } else {
      genres = await Genres.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
      })
    }

    return res.json({ count: genres.length, rows: genres })
  }
}

module.exports = new GenresController()
