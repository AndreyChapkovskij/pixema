const Router = require('express') // связующий роутер

const router = new Router()

const movieRouter = require('./movieRouter')
const genresRouter = require('./genresRouter')
const countryRouter = require('./countryRouter')
const searchRouter = require('./searchRouter')

router.use('/movies', movieRouter)
router.use('/genres', genresRouter)
router.use('/country', countryRouter)
router.use('/search', searchRouter)

module.exports = router
