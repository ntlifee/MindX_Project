require('dotenv').config()
const express = require('express')
const router = require('./routes/indexRouter.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const sequelize = require('./database.js')
const models = require('./models/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


//Последний middlware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.query('CREATE EXTENSION IF NOT EXISTS citext');
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`))
    } catch (e) {
        console.log(e)
    }
}
start()

