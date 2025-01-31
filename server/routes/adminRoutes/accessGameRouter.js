const Router = require('express')
const router = new Router()
const accessGameController = require('../../controllers/accessGameController')

router.delete('/:id', accessGameController.delete)
router.get('/', accessGameController.getAll)
router.post('/', accessGameController.create)

module.exports = router