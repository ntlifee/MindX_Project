const Router = require('express')
const router = new Router()
const carouselDataController = require('../../controllers/carouselDataController')

router.put('/:id', carouselDataController.update)
router.get('/:id', carouselDataController.getOne)
router.get('/', carouselDataController.getAll)
router.post('/', carouselDataController.create)

module.exports = router