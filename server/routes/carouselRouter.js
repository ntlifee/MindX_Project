const Router = require('express')
const router = new Router()
const userAnswerController = require('../controllers/userAnswerController')
const carouselDataController = require('../controllers/carouselDataController')
const questionGameController = require('../controllers/questionGameController')
const checkRoleForGameMiddleware = require('../middleware/checkRoleForGameMiddleware')

router.get('/:id/carouselData', checkRoleForGameMiddleware(), carouselDataController.getOne)
router.get('/:id/gameData', checkRoleForGameMiddleware(), questionGameController.getOne)
router.post('/:id', checkRoleForGameMiddleware(), userAnswerController.create)

module.exports = router