const Router = require('express')
const router = new Router()
const questionGameController = require('../../controllers/questionGameController')

router.delete('/:id', questionGameController.delete)
router.get('/', questionGameController.getAll)
router.post('/', questionGameController.create)

module.exports = router