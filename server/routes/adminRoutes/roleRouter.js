const Router = require('express')
const router = new Router()
const roleController = require('../../controllers/roleController')

router.delete('/:id', roleController.delete)
router.put('/:id', roleController.update)
router.get('/', roleController.getAll)
router.post('/', roleController.create)

module.exports = router