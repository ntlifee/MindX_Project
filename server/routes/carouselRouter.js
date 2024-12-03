const Router = require('express')
const router = new Router()
const carouselController = require('../controllers/carouselController')
const userAnswerController = require('../controllers/userAnswerController')
const checkRoleForGameMiddleware = require('../middleware/checkRoleForGameMiddleware')

router.get('/:id', checkRoleForGameMiddleware(), carouselController.getOne)
router.post('/:id', checkRoleForGameMiddleware(), userAnswerController.create)

module.exports = router