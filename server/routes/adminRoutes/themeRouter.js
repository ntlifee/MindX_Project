const Router = require('express')
const router = new Router()
const themeController = require('../../controllers/themeController')

router.delete('/:id', themeController.delete)
router.put('/:id', themeController.update)
router.get('/', themeController.getAll)
router.post('/', themeController.create)

module.exports = router