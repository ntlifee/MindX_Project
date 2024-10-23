const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carouselRouter = require('./carouselRouter')

router.use('/user', userRouter)
router.use('/carousel', carouselRouter)

module.exports = router