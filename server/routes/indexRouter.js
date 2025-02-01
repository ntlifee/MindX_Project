const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')
const adminRouter = require('./adminRoutes/adminRouter')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.use('/user', userRouter)
router.use('/carousel', authMiddleware(), carouselRouter)
router.use('/admin', authMiddleware(), checkRoleMiddleware('ADMIN'), adminRouter)

module.exports = router