const Router = require('express')
const router = new Router()
const userAnswerController = require('../../controllers/userAnswerController')

router.delete('/:id', userAnswerController.delete)
router.get('/', userAnswerController.getAll)

module.exports = router