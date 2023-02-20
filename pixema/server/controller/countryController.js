const { Op } = require('sequelize')

const { Country } = require('../models/models')

class CountryController {
  async getAll(req, res) {
    let country

    country = await Country.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })

    return res.json(country)
  }
}

module.exports = new CountryController()
