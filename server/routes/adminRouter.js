const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')
const squareController = require('../controllers/squareController')
const imageController = require('../controllers/imageController')
const questionController = require('../controllers/questionController')
const gameController = require('../controllers/gameController')
const themeController = require('../controllers/themeController')
const userAnswerController = require('../controllers/userAnswerController')

router.delete('/carousel/:id', carouselController.delete)
router.put('/carousel/:id', carouselController.update)
router.get('/carousel/:id', carouselController.getOne)
router.post('/carousel', carouselController.create)

router.delete('/square/:id', squareController.delete)
router.put('/square/:id', squareController.update)
router.get('/square/:id', squareController.getOne)
router.post('/square', squareController.create)

router.delete('/image/:id', imageController.delete)
router.get('/image', imageController.getAll)
router.post('/image', imageController.create)

router.delete('/question/:id', questionController.delete)
router.put('/question/:id', questionController.update)
router.get('/question', questionController.getAll)
router.post('/question', questionController.create)

router.delete('/game/:id', gameController.delete)
router.put('/game/:id', gameController.update)
router.get('/game/:id', gameController.getOne)
router.get('/game', gameController.getAll)
router.post('/game', gameController.create)

router.delete('/theme/:id', themeController.delete)
router.put('/theme/:id', themeController.update)
router.get('/theme', themeController.getAll)
router.post('/theme', themeController.create)

router.get('/userAnswer', userAnswerController.getAll)
router.post('/userAnswer', userAnswerController.create)

module.exports = router