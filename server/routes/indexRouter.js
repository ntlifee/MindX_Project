const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')
const adminRouter = require('./adminRouter')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const checkRoleForGameMiddleware = require('../middleware/checkRoleForGameMiddleware')

router.use('/user', userRouter)
router.use('/carousel/:id', checkRoleForGameMiddleware(), carouselRouter)
router.use('/admin', checkRoleMiddleware('ADMIN'), adminRouter)

module.exports = router