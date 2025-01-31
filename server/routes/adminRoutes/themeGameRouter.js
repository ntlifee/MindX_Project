const Router = require('express')
const router = new Router()
const themeGameController = require('../../controllers/themeGameController')

router.delete('/:id', themeGameController.delete)
router.get('/', themeGameController.getAll)
router.post('/', themeGameController.create)

module.exports = router