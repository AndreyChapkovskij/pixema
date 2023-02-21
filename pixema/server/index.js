require('dotenv').config()
const express = require('express')

const models = require('./models/models')

const sequelize = require('./db')
const PORT = process.env.PORT || 5000 // take port from .env

const router = require('./routers/index') // main router

const cors = require('cors') // request from browser
const app = express()

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const fileUpload = require('express-fileupload')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(fileUpload({}))
app.use('/api', router) //use main router

// Обработка ошибок
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'working' })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
