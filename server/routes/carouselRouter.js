const Router = require('express')
const router = new Router()
const userAnswerController = require('../controllers/userAnswerController')
const gameController = require('../controllers/gameController')
const checkRoleForGameMiddleware = require('../middlewares/checkRoleForGameMiddleware')
const validateRequest = require("../middlewares/validateRequest");
const { userAnswerSchema } = require("../schemas/userAnswerSchema");

router.get('/:id', gameController.getOne)
router.post('/:id', checkRoleForGameMiddleware(), validateRequest(userAnswerSchema), userAnswerController.create)

module.exports = router