const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')

router.get('/:id', carouselController.getOne)
router.get('/', carouselController.getAll)

module.exports = router