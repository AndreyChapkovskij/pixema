const Router = require('express')
const router = new Router()

const genresController = require('../controller/genresController')

router.get('/', genresController.getAll)

module.exports = router
