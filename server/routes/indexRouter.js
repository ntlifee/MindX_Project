const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')
const adminRouter = require('./adminRouter')
const checkRole = require('../middleware/authAndCheckRoleMiddleware')

router.use('/user', userRouter)
router.use('/carousel', carouselRouter)
router.use('/admin', checkRole('ADMIN'), adminRouter)

module.exports = router