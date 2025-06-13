require('dotenv').config()
const express = require('express')
const router = require('./routes/indexRouter.js')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require("helmet")
const fileUpload = require('express-fileupload')
const sequelize = require('./database.js')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const path = require('path')


const PORT = process.env.PORT

const corsOptions = {
    origin: ['https://playmindx.online'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // минута
    max: 500, // Максимум 500 запросов с одного IP за указанный промежуток времени
    message: 'Слишком много запросов, пожалуйста, повторите попытку позже.'
})

const app = express()
if (process.env.MODE === 'PROD') {
    app.use(cors(corsOptions))
    app.use(limiter);
    app.use(helmet());
} else {
    app.use(cors())
}
app.use(express.json())
app.use('/api', express.static(path.resolve(__dirname, 'static')))
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
