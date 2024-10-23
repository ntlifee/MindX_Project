const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')

router.get('/', carouselController.getAll)
router.get('/:id', carouselController.getOne)
router.post('/', carouselController.create)

module.exports = router