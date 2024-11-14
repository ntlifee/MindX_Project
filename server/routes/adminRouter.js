const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')
const squareController = require('../controllers/squareController')
const imageController = require('../controllers/imageController')
const questionController = require('../controllers/questionController')

router.delete('/carousel/:id', carouselController.delete)
router.put('/carousel/:id', carouselController.update)
router.get('/carousel/:id', carouselController.getOne)
router.get('/carousel', carouselController.getAll)
router.post('/carousel', carouselController.create)

router.delete('/square/:id', squareController.delete)
router.put('/square/:id', squareController.update)
router.get('/square/:id', squareController.getOne)
router.get('/square', squareController.getAll)
router.post('/square', squareController.create)

router.delete('/images/:id', imageController.delete)
router.get('/images', imageController.getAll)
router.post('/images', imageController.create)

router.delete('/questions/:id', questionController.delete)
router.put('/questions', questionController.update)
router.get('/questions', questionController.getAll)
router.post('/questions', questionController.create)

module.exports = router