const Router = require('express')
const router = new Router()
const themeGameController = require('../../controllers/themeGameController')

router.put('/:id', themeGameController.update)
router.get('/', themeGameController.getAll)

module.exports = router