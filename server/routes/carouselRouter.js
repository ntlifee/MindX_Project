const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')

router.delete('/:id', carouselController.delete)
router.get('/:id', carouselController.getOne)
router.get('/', carouselController.getAll)
router.post('/', carouselController.create)


module.exports = router