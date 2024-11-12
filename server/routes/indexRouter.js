const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/carousel', carouselRouter)
router.use('/admin', adminRouter)  // TODO: реалоизовать доступ только для администраторов

module.exports = router