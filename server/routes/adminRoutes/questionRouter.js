const Router = require('express')
const router = new Router()
const questionController = require('../../controllers/questionController')

router.delete('/:id', questionController.delete)
router.put('/:id', questionController.update)
router.get('/', questionController.getAll)
router.post('/', questionController.create)

module.exports = router