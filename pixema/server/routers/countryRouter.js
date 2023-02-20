const Router = require('express')
const router = new Router()

const countryController = require('../controller/countryController')

router.get('/', countryController.getAll)

module.exports = router
