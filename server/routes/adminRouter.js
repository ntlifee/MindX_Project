const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')
const questionController = require('../controllers/questionController')
const gameController = require('../controllers/gameController')
const themeController = require('../controllers/themeController')
const userAnswerController = require('../controllers/userAnswerController')
const userController = require('../controllers/userController')
const roleController = require('../controllers/roleController')
const accessGameController = require('../controllers/accessGameController')
const questionGameController = require('../controllers/questionGameController')
const themeGameController = require('../controllers/themeGameController')
const carouselDataController = require('../controllers/carouselDataController')

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

router.delete('/user/:id', userController.delete)
router.put('/user/:id', userController.update)
router.get('/user', userController.getAll)
router.post('/user', userController.signup)

router.delete('/role/:id', roleController.delete)
router.put('/role/:id', roleController.update)
router.get('/role', roleController.getAll)
router.post('/role', roleController.create)

router.delete('/accessGame/:id', accessGameController.delete)
router.get('/accessGame', accessGameController.getAll)
router.post('/accessGame', accessGameController.create)

router.delete('/questionGame/:id', questionGameController.delete)
router.get('/questionGame', questionGameController.getAll)
router.post('/questionGame', questionGameController.create)

router.delete('/themeGame/:id', themeGameController.delete)
router.get('/themeGame', themeGameController.getAll)
router.post('/themeGame', themeGameController.create)

router.put('/carouselData/:id', carouselDataController.update)
router.get('/carouselData', carouselDataController.getAll)
router.post('/carouselData', carouselDataController.create)

module.exports = router