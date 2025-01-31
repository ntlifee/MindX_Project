const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')
const adminRouter = require('./adminRoutes/adminRouter')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/carousel', authMiddleware(), carouselRouter)
router.use('/admin', authMiddleware(), checkRoleMiddleware('ADMIN'), adminRouter)

module.exports = router