const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')
const squareController = require('../controllers/squareController')
const imageController = require('../controllers/imageController')
const questionController = require('../controllers/questionController')
const gameController = require('../controllers/gameController')

router.delete('/carousel/:id', carouselController.delete)
router.put('/carousel/:id', carouselController.update)
router.get('/carousel/:id', carouselController.getOne)
router.post('/carousel', carouselController.create)

router.delete('/square/:id', squareController.delete)
router.put('/square/:id', squareController.update)
router.get('/square/:id', squareController.getOne)
router.post('/square', squareController.create)

router.delete('/images/:id', imageController.delete)
router.get('/images', imageController.getAll)
router.post('/images', imageController.create)

router.delete('/questions/:id', questionController.delete)
router.put('/questions/:id', questionController.update)
router.get('/questions', questionController.getAll)
router.post('/questions', questionController.create)

router.delete('/game/:id', gameController.delete)
router.put('/game/:id', gameController.update)
router.get('/game/:id', gameController.getOne)
router.get('/game', gameController.getAll)
router.post('/game', gameController.create)

module.exports = router