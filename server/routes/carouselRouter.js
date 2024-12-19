const Router = require('express')
const router = new Router()
const userAnswerController = require('../controllers/userAnswerController')
const carouselDataController = require('../controllers/carouselDataController')
const questionGameController = require('../controllers/questionGameController')

router.get('/carouselData', carouselDataController.getOne)
router.get('/questionGame', questionGameController.getOne)
router.get('/userAnswer', userAnswerController.getUser)
router.post('/', userAnswerController.create)

module.exports = router