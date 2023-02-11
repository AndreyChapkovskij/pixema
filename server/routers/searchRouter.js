const Router = require('express')
const router = new Router()

const searchController = require('../controller/searchController')

router.get('/', searchController.getAll)

module.exports = router
