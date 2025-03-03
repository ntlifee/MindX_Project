const Router = require('express')
const router = new Router()
const userAnswerController = require('../controllers/userAnswerController')
const gameController = require('../controllers/gameController')
const checkRoleForGameMiddleware = require('../middlewares/checkRoleForGameMiddleware')
const checkStartEndGameMiddleware = require('../middlewares/checkStartEndGameMiddleware')
const validateRequest = require("../middlewares/validateRequest");
const { userAnswerSchema } = require("../schemas/userAnswerSchema");

router.get('/:id', checkRoleForGameMiddleware(), checkStartEndGameMiddleware(), gameController.getOne)
router.post('/:id', checkRoleForGameMiddleware(), checkStartEndGameMiddleware(), validateRequest(userAnswerSchema), userAnswerController.create)

module.exports = router